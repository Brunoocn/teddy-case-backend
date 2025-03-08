import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUpdateClientDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly companyValue: number;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
