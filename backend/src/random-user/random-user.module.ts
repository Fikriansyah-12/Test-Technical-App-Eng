import { Module } from '@nestjs/common';
import { RandomUserController } from './random-user.controller';
import { RandomUserService } from './random-user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RandomUserController],
  providers: [RandomUserService]
})
export class RandomUserModule {}
