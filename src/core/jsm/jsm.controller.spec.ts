import { Test, TestingModule } from '@nestjs/testing';
import { JsmController } from './jsm.controller';
import { JsmService } from './jsm.service';

describe('JsmController', () => {
  let controller: JsmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsmController],
      providers: [JsmService],
    }).compile();

    controller = module.get<JsmController>(JsmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
