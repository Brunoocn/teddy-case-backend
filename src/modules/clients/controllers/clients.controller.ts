import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateService } from '../services/create/create.service';
import { DeleteService } from '../services/delete/delete.service';
import { FindAllService } from '../services/find-all/find-all.service';
import { FindOneService } from '../services/find-one/find-one.service';
import { UpdateIsSelectService } from '../services/update-is-selected/update-is-selected.service';
import { UpdateService } from '../services/update/update.service';

import { CreateUpdateClientDTO } from '../dtos/create-client.dto';

import { UpdateIsSelectByClientIdDTO } from '../dtos/update-is-select-by-client-id.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientService: CreateService,
    private readonly updateClientService: UpdateService,
    private readonly deleteClientService: DeleteService,
    private readonly findOneClientService: FindOneService,
    private readonly findAllClientsService: FindAllService,
    private readonly updateIsSelectService: UpdateIsSelectService,
  ) {}

  @Post()
  async create(@Body() createClientDto: CreateUpdateClientDTO) {
    return this.createClientService.create(createClientDto);
  }

  @Get('')
  async findAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
    @Query('userId') userId?: string,
    @Query('isSelect') isSelect?: boolean,
  ) {
    return this.findAllClientsService.findAll({
      page,
      pageSize,
      userId,
      isSelect,
    });
  }

  @Get(':clientId')
  async findOne(@Param('clientId') clientId: string) {
    return this.findOneClientService.findOne({ clientId });
  }

  @Put(':clientId')
  async update(
    @Param('clientId') clientId: string,
    @Body() updateClientDto: CreateUpdateClientDTO,
  ) {
    return this.updateClientService.update({ clientId, ...updateClientDto });
  }

  @Patch(':clientId/select')
  async updateIsSelect(
    @Param('clientId') clientId: string,
    @Body() updateIsSelectDto: UpdateIsSelectByClientIdDTO,
  ) {
    return this.updateIsSelectService.updateIsSelect({
      clientId,
      ...updateIsSelectDto,
    });
  }

  @Delete(':clientId')
  async delete(@Param('clientId') clientId: string) {
    return this.deleteClientService.delete({ clientId });
  }
}
