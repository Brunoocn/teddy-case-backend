import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async delete({ clientId }: { clientId: string }): Promise<void> {
    const client = await this.findClientOrFail(clientId);

    await this.clientRepository.softRemove(client);
  }

  private async findClientOrFail(clientId: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id: clientId });

    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    return client;
  }
}
