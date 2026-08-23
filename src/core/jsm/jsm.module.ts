import { Global, Module } from '@nestjs/common';
import { JsmService } from './jsm.service';
import { JsmController } from './jsm.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  controllers: [JsmController],
  providers: [JsmService, ConfigService],
  imports: [HttpModule],
  exports: [JsmService],
})
export class JsmModule {}
