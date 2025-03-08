import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneClientsByUserIdDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
