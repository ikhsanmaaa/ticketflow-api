import { Test, TestingModule } from '@nestjs/testing';
import { PortalTokenService } from './portal-token.service';

describe('PortalTokenService', () => {
  let service: PortalTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortalTokenService],
    }).compile();

    service = module.get<PortalTokenService>(PortalTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
