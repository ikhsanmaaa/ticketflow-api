import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JiraModule } from 'src/core/jira/jira.module';

@Module({
  imports: [JiraModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
