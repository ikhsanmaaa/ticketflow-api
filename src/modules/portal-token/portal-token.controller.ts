import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PortalTokenService } from './portal-token.service';
import { CreatePortalTokenDto } from './dto/create-portal-token.dto';
import { JsmService } from 'src/core/jsm/jsm.service';

@Controller('token')
export class PortalTokenController {
  constructor(
    private readonly portalTokenService: PortalTokenService,
    private readonly jsmService: JsmService,
  ) {}

  @Post('generate')
  generate(@Body() dto: CreatePortalTokenDto) {
    return this.portalTokenService.generateToken(dto.ticketNumber);
  }

  @Get(':token')
  getDashboard(@Param('token') token: string) {
    const ticketNumber = this.portalTokenService.decrypt(token);
    return this.jsmService.getIssues(ticketNumber);
  }
}
