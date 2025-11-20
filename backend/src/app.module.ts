import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutModule } from './checkout/checkout.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RandomUserModule } from './random-user/random-user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  CheckoutModule, AuthModule, RandomUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
