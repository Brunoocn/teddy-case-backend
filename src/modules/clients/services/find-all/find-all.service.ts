import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/modules/database/entities/client.entity';

import { Repository } from 'typeorm';
import { FindAllClientsByUserIdDTO } from '../../dtos/find-all-clients-by-user-id.dto';
import { getOffset } from 'src/shared/pagination/get-offset';
import { getTotalPages } from 'src/shared/pagination/get-total-pages';
import { IFindAllClientsByUserIdResponseDTO } from '../../dtos/find-all-clients-by-user-id-response.dto';

@Injectable()
export class FindAllService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll({
    page,
    pageSize,
    userId,
    isSelect,
  }: FindAllClientsByUserIdDTO): Promise<IFindAllClientsByUserIdResponseDTO> {
    const where = {
      user: { id: userId },
      deletedAt: null,
    };

    if (isSelect) {
      where['isSelect'] = isSelect;
    }

    const [data, total] = await this.clientRepository.findAndCount({
      where,
      skip: getOffset({ page, pageSize }),
      take: pageSize,
    });

    return {
      list: data,
      paging: {
        total,
        page,
        pages: getTotalPages({ total, pageSize }),
      },
    };
  }
}
