import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';

import { Repository } from 'typeorm';
import { IUpdateClient } from '../../types/update-client';

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async update({
    clientId,
    name,
    companyValue,
    salary,
  }: IUpdateClient): Promise<Client> {
    const client = await this.findClientOrFail(clientId);

    client.name = name;
    client.companyValue = companyValue;
    client.salary = salary;

    return this.clientRepository.save(client);
  }

  private async findClientOrFail(clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    return client;
  }
}
