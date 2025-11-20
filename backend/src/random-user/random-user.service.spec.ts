import { Test, TestingModule } from '@nestjs/testing';
import { RandomUserService } from './random-user.service';

describe('RandomUserService', () => {
  let service: RandomUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomUserService],
    }).compile();

    service = module.get<RandomUserService>(RandomUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
