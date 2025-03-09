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
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { CreateService } from '../services/create/create.service';
import { DeleteService } from '../services/delete/delete.service';
import { FindAllService } from '../services/find-all/find-all.service';
import { FindOneService } from '../services/find-one/find-one.service';
import { UpdateIsSelectService } from '../services/update-is-selected/update-is-selected.service';
import { UpdateService } from '../services/update/update.service';

import { CreateUpdateClientDTO } from '../dtos/create-client.dto';
import { UpdateIsSelectByClientIdDTO } from '../dtos/update-is-select-by-client-id.dto';
@ApiTags('Clientes')
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

  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
    type: CreateUpdateClientDTO,
  })
  @ApiBody({ type: CreateUpdateClientDTO })
  @Post()
  async create(@Body() createClientDto: CreateUpdateClientDTO) {
    return this.createClientService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Obter todos os clientes com paginação' })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    example: 10,
    description: 'Quantidade de clientes por página',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID do usuário',
  })
  @ApiQuery({
    name: 'isSelect',
    required: false,
    example: true,
    description: 'Filtrar clientes que possuem "isSelect" ativo',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes retornada com sucesso',
    type: [CreateUpdateClientDTO],
  })
  @Get('')
  async findAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
    @Query('userId') userId?: string,
    @Query('isSelect') isSelect = false,
  ) {
    return this.findAllClientsService.findAll({
      page,
      pageSize,
      userId,
      isSelect,
    });
  }

  @ApiOperation({ summary: 'Buscar um cliente pelo ID' })
  @ApiParam({
    name: 'clientId',
    description: 'ID do cliente',
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso',
    type: CreateUpdateClientDTO,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Get(':clientId')
  async findOne(@Param('clientId') clientId: string) {
    return this.findOneClientService.findOne({ clientId });
  }

  @ApiOperation({ summary: 'Atualizar um cliente' })
  @ApiParam({
    name: 'clientId',
    description: 'ID do cliente',
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
  })
  @ApiBody({ type: CreateUpdateClientDTO })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso',
    type: CreateUpdateClientDTO,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Put(':clientId')
  async update(
    @Param('clientId') clientId: string,
    @Body() updateClientDto: CreateUpdateClientDTO,
  ) {
    return this.updateClientService.update({ clientId, ...updateClientDto });
  }

  @ApiOperation({ summary: 'Atualizar o campo "isSelect" de um cliente' })
  @ApiParam({
    name: 'clientId',
    description: 'ID do cliente',
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
  })
  @ApiBody({ type: UpdateIsSelectByClientIdDTO })
  @ApiResponse({
    status: 200,
    description: 'Campo "isSelect" atualizado com sucesso',
    type: UpdateIsSelectByClientIdDTO,
  })
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

  @ApiOperation({ summary: 'Deletar um cliente (soft delete)' })
  @ApiParam({
    name: 'clientId',
    description: 'ID do cliente',
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
  })
  @ApiResponse({ status: 200, description: 'Cliente deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @Delete(':clientId')
  async delete(@Param('clientId') clientId: string) {
    return this.deleteClientService.delete({ clientId });
  }
}
