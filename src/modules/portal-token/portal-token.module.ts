import { Module } from '@nestjs/common';
import { PortalTokenService } from './portal-token.service';
import { PortalTokenController } from './portal-token.controller';
import { JiraService } from '../../core/jira/jira.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PortalTokenController],
  providers: [PortalTokenService, JiraService],
  imports: [HttpModule],
})
export class PortalTokenModule {}
