import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllClientsByUserIdDTO {
  @ApiProperty({
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
    description: 'ID do usuário associado aos clientes',
  })
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página para paginação (opcional)',
  })
  @IsOptional()
  @IsNumber()
  readonly page: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de clientes por página (opcional)',
  })
  @IsOptional()
  @IsNumber()
  readonly pageSize: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Filtrar clientes que possuem "isSelect" ativo (opcional)',
  })
  @IsOptional()
  @IsBoolean()
  readonly isSelect: boolean;
}
