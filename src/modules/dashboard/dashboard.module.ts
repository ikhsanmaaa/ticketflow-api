import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JsmModule } from 'src/core/jsm/jsm.module';

@Module({
  imports: [JsmModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
