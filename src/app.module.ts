import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    DatabaseModule,
    ClientsModule,
  ],
})
export class AppModule {}
