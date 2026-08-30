import { IsString } from 'class-validator';

export class PutFieldDto {
  @IsString()
  issueKey: string;

  @IsString()
  fieldId: string;

  @IsString()
  value: string;
}
