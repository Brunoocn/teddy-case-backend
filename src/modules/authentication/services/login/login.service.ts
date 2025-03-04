import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { User as UserFormatted } from '../../types/user';
import { LoginDTO } from '../../dtos/login-user.dto';
import { HashComparer } from 'src/modules/cryptography/abstract/hash-comparer';
import { Encrypter } from 'src/modules/cryptography/abstract/encrypter';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async login({ email, password }: LoginDTO) {
    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuario não encontrado');
    }

    await this.validateUserPassword({
      inputPassword: password,
      userPassword: userExists.password,
    });

    const userFiltered: UserFormatted = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };

    const token = await this.encrypter.encrypt({
      user: userFiltered,
    });

    return {
      token,
      user: userFiltered,
    };
  }

  private async validateUserPassword({
    inputPassword,
    userPassword,
  }: {
    inputPassword: string;
    userPassword: string;
  }) {
    const isPasswordMatch = await this.hashComparer.compare(
      inputPassword,
      userPassword,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email e/ou senha inválidos');
    }
  }
}
