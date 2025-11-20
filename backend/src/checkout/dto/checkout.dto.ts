import { IsNumber, IsOptional } from "class-validator";

export class checkoutDto{

  @IsNumber()
  price: number

  @IsNumber()
  @IsOptional()
  voucher: number
}