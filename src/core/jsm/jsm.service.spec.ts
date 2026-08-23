import { Test, TestingModule } from '@nestjs/testing';
import { JsmService } from './jsm.service';

describe('JsmService', () => {
  let service: JsmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsmService],
    }).compile();

    service = module.get<JsmService>(JsmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
