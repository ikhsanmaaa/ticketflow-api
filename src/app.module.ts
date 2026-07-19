import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';
import { JiraModule } from './jira/jira.module';
import { JiraModule } from './jira/jira.module';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DashboardModule, UserModule, JiraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
