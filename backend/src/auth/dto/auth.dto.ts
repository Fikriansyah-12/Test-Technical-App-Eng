import { IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
