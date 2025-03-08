import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneClientsByUserIdDTO {
  @ApiProperty({
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
    description: 'ID do cliente a ser buscado',
  })
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
