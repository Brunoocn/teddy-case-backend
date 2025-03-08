import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';

import { Repository } from 'typeorm';

import { FindOneClientsByUserIdDTO } from '../../dtos/find-one-client-by-user-id.dto';

@Injectable()
export class FindOneService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findOne({ clientId }: FindOneClientsByUserIdDTO): Promise<Client> {
    return this.clientRepository.findOne({
      where: {
        id: clientId,
      },
    });
  }
}
