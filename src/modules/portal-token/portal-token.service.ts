import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/core/crypto/crypto.service';

@Injectable()
export class PortalTokenService {
  constructor(private readonly crypto: CryptoService) {}

  generateToken(ticketNumber: string) {
    return this.crypto.generateToken(ticketNumber);
  }

  decrypt(token: string) {
    return this.crypto.decrypt(token);
  }
}
