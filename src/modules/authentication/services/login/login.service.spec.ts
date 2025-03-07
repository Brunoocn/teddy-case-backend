import { describe, it, expect, beforeEach } from 'vitest';
import { LoginService } from './login.service';

import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from '../../dtos/login-user.dto';
import { HashComparer } from 'src/modules/cryptography/abstract/hash-comparer';
import { Encrypter } from 'src/modules/cryptography/abstract/encrypter';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';

class HashComparerMock implements HashComparer {
  async compare(input: string, hashed: string): Promise<boolean> {
    return input === hashed;
  }
}

class EncrypterMock implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return 'mocked_token';
  }
}

describe('LoginService', () => {
  let loginService: LoginService;
  let userRepository: InMemoryUserRepository;
  let hashComparer: HashComparerMock;
  let encrypter: EncrypterMock;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashComparer = new HashComparerMock();
    encrypter = new EncrypterMock();
    loginService = new LoginService(
      userRepository as any,
      hashComparer,
      encrypter,
    );
  });

  it('should successfully log in and return a token', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await userRepository.save(user);

    const loginData: LoginDTO = {
      email: 'johndoe@example.com',
      password: '123456',
    };

    const response = await loginService.login(loginData);

    expect(response).toHaveProperty('token');
    expect(response.token).toBe('mocked_token');
    expect(response.user).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should throw NotFoundException if the user does not exist', async () => {
    await expect(
      loginService.login({
        email: 'notfound@example.com',
        password: '123456',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException if the password is incorrect', async () => {
    const user = userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await userRepository.save(user);

    await expect(
      loginService.login({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
