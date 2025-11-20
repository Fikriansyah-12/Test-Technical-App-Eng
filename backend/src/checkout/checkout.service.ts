import { Injectable } from '@nestjs/common';
import { checkoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
    checkout(checkoutDto: checkoutDto){
        const price = checkoutDto.price; // Rp.5.000.000,
        const voucher = checkoutDto.voucher ?? 50; // voucher 50%
        const voucherRate = voucher/100 
        const voucherAmount = price * voucherRate;
        const totalPrice = price - voucherAmount;
        const pointRate = 0.02
        const points = voucherAmount * pointRate;

        return {
            price,
            voucherAmount,
            voucher,
            totalPrice,
            points
        }
    }
}
