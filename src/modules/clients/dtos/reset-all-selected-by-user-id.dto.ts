import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetAllSelectedByIdDTO {
  @ApiProperty({
    example: false,
    description: 'Define todos os clientes como não selecionados',
  })
  @IsBoolean()
  resetAllSelected?: boolean;
}
