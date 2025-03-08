import { IsBoolean, IsString } from 'class-validator';

export class UpdateIsSelectByClientIdDTO {
  @IsBoolean()
  readonly isSelect: boolean;
}
