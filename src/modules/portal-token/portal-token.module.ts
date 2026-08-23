import { Module } from '@nestjs/common';
import { PortalTokenService } from './portal-token.service';
import { PortalTokenController } from './portal-token.controller';
import { HttpModule } from '@nestjs/axios';
import { JsmService } from 'src/core/jsm/jsm.service';
import { CryptoService } from 'src/core/crypto/crypto.service';

@Module({
  controllers: [PortalTokenController],
  providers: [PortalTokenService, JsmService, CryptoService],
  imports: [HttpModule],
})
export class PortalTokenModule {}
