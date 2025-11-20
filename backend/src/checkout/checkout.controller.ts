import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { checkoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
    constructor(
        private readonly checkoutService: CheckoutService
    ){}

    @Post()
    async checkout(@Body()checkoutDto:checkoutDto){
        return this.checkoutService.checkout(checkoutDto)
    }
}
