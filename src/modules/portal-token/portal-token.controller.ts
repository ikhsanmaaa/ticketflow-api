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
import { JiraService } from '../../core/jira/jira.service';

@Controller('token')
export class PortalTokenController {
  constructor(
    private readonly portalTokenService: PortalTokenService,
    private readonly jiraService: JiraService,
  ) {}

  @Post('generate')
  generate(@Body() dto: CreatePortalTokenDto) {
    return this.portalTokenService.generateToken(dto.ticketNumber);
  }

  @Get(':token')
  getDashboard(@Param('token') token: string) {
    const ticketNumber = this.portalTokenService.decrypt(token);
    return this.jiraService.getIssues(ticketNumber);
  }
}
