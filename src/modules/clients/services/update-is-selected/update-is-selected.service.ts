import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';

import { Repository } from 'typeorm';
import { IUpdateIsSelectedUser } from '../../types/update-is-select-client';

@Injectable()
export class UpdateIsSelectService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async updateIsSelect({
    isSelect,
    clientId,
  }: IUpdateIsSelectedUser): Promise<Client> {
    const client = await this.findClientOrFail(clientId);

    client.isSelect = isSelect;

    return this.clientRepository.save(client);
  }

  async resetAllSelected(userId: string): Promise<void> {
    await this.clientRepository.update(
      { user: { id: userId } },
      { isSelect: false },
    );
  }

  private async findClientOrFail(clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    return client;
  }
}
