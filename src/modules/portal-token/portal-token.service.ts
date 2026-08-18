import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PortalTokenService {
  private readonly algorithm = 'aes-256-gcm';

  private key = crypto
    .createHash('sha256')
    .update(process.env.TOKEN_SECRET!)
    .digest();

  generateToken(ticketNumber: string) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    const payload = JSON.stringify({
      t: ticketNumber,
      exp: Date.now() + 60 * 60 * 1000,
    });
    let encrypted = cipher.update(payload, 'utf8', 'base64url');
    encrypted += cipher.final('base64url');
    const authTag = cipher.getAuthTag().toString('base64url');
    const token = `${iv.toString('hex')}:${authTag}:${encrypted}`;
    return { url: `${process.env.FE_BASE_URL}/token/${token}` };
  }

  decrypt(token: string) {
    const [ivHex, tagHex, encrypted] = token.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(ivHex, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(tagHex, 'base64url'));
    let decrypted = decipher.update(encrypted, 'base64url', 'utf8');
    decrypted += decipher.final('utf8');
    const { t, exp } = JSON.parse(decrypted);
    if (Date.now() > exp) throw new Error('Token expired');
    return t;
  }
}
