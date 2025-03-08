import { Client } from 'src/modules/database/entities/client.entity';

export interface IFindAllClientsByUserIdResponseDTO {
  list: Client[];
  paging: {
    total: number;
    page: number;
    pages: number;
  };
}
