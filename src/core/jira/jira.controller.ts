import { Controller, Get } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('api')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('allticket')
  getAllTicket() {
    return this.jiraService.getAllIssues();
  }
}
