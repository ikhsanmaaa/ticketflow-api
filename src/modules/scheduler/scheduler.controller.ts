import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { BatchTestDto } from './dto/batch-test.dto';
import { JsmService } from 'src/core/jsm/jsm.service';
import { PutFieldDto } from './dto/put-field.dto';

@Controller('scheduler')
export class SchedulerController {
  constructor(
    private readonly schedulerService: SchedulerService,
    private readonly jsmService: JsmService,
  ) {}

  @Put('batch')
  async runBatchTest(@Body() dto: BatchTestDto) {
    return this.schedulerService.runBatchTest(dto);
  }
  @Put('test')
  async testPut(@Body() dto: PutFieldDto) {
    return this.schedulerService.testUpdate(dto);
  }
}
