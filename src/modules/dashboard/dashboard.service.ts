import { Injectable } from '@nestjs/common';
import { JiraService } from 'src/core/jira/jira.service';

@Injectable()
export class DashboardService {
  constructor(private readonly jiraService: JiraService) {}

  async getDashboard() {
    return await this.jiraService.getTopFiveIssue();
  }
}
