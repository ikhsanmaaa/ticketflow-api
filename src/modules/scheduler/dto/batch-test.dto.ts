import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class BatchTestDto {
  @IsIn([50, 100, 150, 200])
  batchSize: number;

  @IsString()
  fieldId: string;

  @IsOptional()
  value?: unknown;
}
