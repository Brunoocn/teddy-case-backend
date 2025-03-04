import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { PluralNamingStrategy } from './config/plural-naming.strategy';
import { User } from './modules/authentication/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthenticationModule, DatabaseModule],
})
export class AppModule {}
