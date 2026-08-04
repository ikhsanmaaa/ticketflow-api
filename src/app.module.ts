import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JiraModule } from './core/jira/jira.module';
import { ConfigModule } from '@nestjs/config';
import { PortalTokenModule } from './modules/portal-token/portal-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DashboardModule,
    JiraModule,
    PortalTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
