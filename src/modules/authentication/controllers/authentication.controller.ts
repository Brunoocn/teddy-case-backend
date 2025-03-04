import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { SkipAuth } from 'src/common/decorators/skipAuth.decorator';
import { LoginDTO } from '../dtos/login-user.dto';
import { User } from '../types/user';
import { LoginService } from '../services/login/login.service';
import { RegisterService } from '../services/register/register.service';

import { RegisterDTO } from '../dtos/register-user.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @Get('/token-valid')
  async validToken(): Promise<boolean> {
    return true;
  }

  @SkipAuth()
  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body() { email, password }: LoginDTO,
  ): Promise<LoginResponseDTO> {
    return this.loginService.login({ email, password });
  }

  @SkipAuth()
  @Post('/register')
  @HttpCode(201)
  async registerUser(
    @Body() { name, email, password }: RegisterDTO,
  ): Promise<User> {
    return this.registerService.register({ name, email, password });
  }
}
