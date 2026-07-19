import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [JiraController],
  providers: [JiraService],
  imports: [
    HttpService,
    ConfigService
  ]
})
export class JiraModule { }
