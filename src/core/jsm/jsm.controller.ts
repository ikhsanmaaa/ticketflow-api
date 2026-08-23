import { Controller, Get } from '@nestjs/common';
import { JsmService } from './jsm.service';

@Controller('api')
export class JsmController {
  constructor(private readonly JsmService: JsmService) {}

  @Get('allticket')
  getAllTicket() {
    return this.JsmService.getAllIssues();
  }
}
