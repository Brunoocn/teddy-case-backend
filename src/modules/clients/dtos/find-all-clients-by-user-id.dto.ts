import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllClientsByUserIdDTO {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsOptional()
  @IsNumber()
  readonly page: number;

  @IsOptional()
  @IsNumber()
  readonly pageSize: number;
}
