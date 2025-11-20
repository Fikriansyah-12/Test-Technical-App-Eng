import { Test, TestingModule } from '@nestjs/testing';
import { RandomUserController } from './random-user.controller';

describe('RandomUserController', () => {
  let controller: RandomUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomUserController],
    }).compile();

    controller = module.get<RandomUserController>(RandomUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
