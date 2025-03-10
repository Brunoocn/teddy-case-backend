import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateClientDTO {
  @ApiProperty({
    example: 'Cliente Exemplo',
    description: 'Nome do cliente',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 100000,
    description: 'Valor da empresa do cliente',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly companyValue: number;

  @ApiProperty({
    example: 10000,
    description: 'Salário do cliente',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;

  @ApiProperty({
    example: '4154eff6-aefd-4472-bdea-b3bc77d299d7',
    description: 'ID do usuário associado ao cliente',
  })
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
