import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../authentication/database/entities/user.entity';
import { PluralNamingStrategy } from 'src/config/plural-naming.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
