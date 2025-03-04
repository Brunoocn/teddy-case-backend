import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterService } from './register.service';

import { BadRequestException } from '@nestjs/common';
import { RegisterDTO } from '../../dtos/register-user.dto';
import { HashGenerator } from 'src/modules/cryptography/abstract/hash-generator';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';

// Mock class for HashGenerator
class HashGeneratorMock implements HashGenerator {
  async hash(value: string): Promise<string> {
    return `hashed-${value}`;
  }
}

describe('RegisterService', () => {
  let registerService: RegisterService;
  let userRepository: InMemoryUserRepository;
  let hashGenerator: HashGeneratorMock;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashGenerator = new HashGeneratorMock();
    registerService = new RegisterService(userRepository as any, hashGenerator);
  });

  it('should be defined', () => {
    expect(registerService).toBeDefined();
  });

  it('should successfully register a new user', async () => {
    const userData: RegisterDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const newUser = await registerService.register(userData);

    expect(newUser).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      email: userData.email,
    });
  });

  it('should throw BadRequestException if the email is already registered', async () => {
    const userData: RegisterDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    await registerService.register(userData);

    await expect(registerService.register(userData)).rejects.toThrow(
      new BadRequestException('Email já cadastrado'),
    );
  });

  it('should throw BadRequestException if the password is too short', async () => {
    const userData: RegisterDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    };

    await expect(registerService.register(userData)).rejects.toThrow(
      new BadRequestException('Senha deve ter no mínimo 6 caracteres'),
    );
  });

  it('should hash the password before saving', async () => {
    const userData: RegisterDTO = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'abcdef',
    };

    const newUser = await registerService.register(userData);

    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe(userData.name);
    expect(newUser.email).toBe(userData.email);
  });
});
