import { Test, TestingModule } from '@nestjs/testing';
import { PortalTokenController } from './portal-token.controller';
import { PortalTokenService } from './portal-token.service';

describe('PortalTokenController', () => {
  let controller: PortalTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalTokenController],
      providers: [PortalTokenService],
    }).compile();

    controller = module.get<PortalTokenController>(PortalTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
