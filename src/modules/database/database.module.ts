import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PluralNamingStrategy } from 'src/config/plural-naming.strategy';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Client } from './entities/client.entity';

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
      entities: [User, Client],
      synchronize: true,
      namingStrategy: new PluralNamingStrategy(),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
