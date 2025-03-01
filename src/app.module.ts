import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { PluralNamingStrategy } from './config/plural-naming.strategy';
import { User } from './modules/authentication/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/jwt-guard/jwt-auth.guard';
import { JwtStrategy } from './common/jwt-guard/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DATABASE_HOST,
      port: parseInt(process.env.PG_DATABASE_PORT),
      username: process.env.PG_DATABASE_USER,
      password: process.env.PG_DATABASE_PASSWORD,
      database: process.env.PG_DATABASE_NAME,
      entities: [User],
      synchronize: true,
      namingStrategy: new PluralNamingStrategy(),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
