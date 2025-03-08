import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';

import { Repository } from 'typeorm';
import { CreateUpdateClientDTO } from '../../dtos/create-client.dto';

@Injectable()
export class CreateService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create({
    name,
    companyValue,
    userId,
  }: CreateUpdateClientDTO): Promise<Client> {
    const clientAlreadyExists = await this.clientAlreadyExists(name);

    if (clientAlreadyExists) {
      throw new BadRequestException('Client already exists');
    }

    const newClient = this.clientRepository.create({
      name,
      companyValue,
      user: { id: userId },
    });

    await this.clientRepository.save(newClient);

    return newClient;
  }

  private async clientAlreadyExists(name: string): Promise<boolean> {
    const client = await this.clientRepository.findOne({ where: { name } });

    if (client) {
      return true;
    }

    return false;
  }
}
