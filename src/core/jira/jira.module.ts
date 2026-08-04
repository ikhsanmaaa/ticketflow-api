import { Global, Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  controllers: [JiraController],
  providers: [JiraService, ConfigService],
  imports: [HttpModule],
  exports: [JiraService],
})
export class JiraModule {}
