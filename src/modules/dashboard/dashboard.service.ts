import { Injectable } from '@nestjs/common';
import { JsmService } from 'src/core/jsm/jsm.service';

@Injectable()
export class DashboardService {
  constructor(private readonly jsmService: JsmService) {}

  async getDashboard() {
    return await this.jsmService.getTopFiveIssue();
  }
}
