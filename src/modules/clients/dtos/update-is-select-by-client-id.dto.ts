import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIsSelectByClientIdDTO {
  @ApiProperty({
    example: true,
    description: 'Define se o cliente está selecionado ou não',
  })
  @IsBoolean()
  readonly isSelect: boolean;
}
