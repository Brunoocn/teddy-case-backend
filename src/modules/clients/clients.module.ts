import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsController } from './controllers/clients.controller';
import { CreateService } from './services/create/create.service';
import { DeleteService } from './services/delete/delete.service';
import { FindAllService } from './services/find-all/find-all.service';
import { FindOneService } from './services/find-one/find-one.service';
import { UpdateIsSelectService } from './services/update-is-selected/update-is-selected.service';
import { UpdateService } from './services/update/update.service';
import { Client } from '../database/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    CreateService,
    DeleteService,
    FindAllService,
    FindOneService,
    UpdateIsSelectService,
    UpdateService,
  ],
})
export class ClientsModule {}
