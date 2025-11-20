import { Controller, Get, Query } from '@nestjs/common';
import { RandomUserService } from './random-user.service';

@Controller('random-user')
export class RandomUserController {
  constructor(private service: RandomUserService) {}

  @Get('fetch')
  async fetchUsers(
    @Query('results') results: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.service.manipulatedAp(results, page);
  }

  @Get('combine')
  combineArrays() {
    return this.service.combineArray();
  }
}
