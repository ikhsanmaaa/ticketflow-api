import { PartialType } from '@nestjs/mapped-types';
import { CreatePortalTokenDto } from './create-portal-token.dto';

export class UpdatePortalTokenDto extends PartialType(CreatePortalTokenDto) {}
