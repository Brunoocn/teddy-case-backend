import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [LoginService, RegisterService],
})
export class AuthenticationModule {}
