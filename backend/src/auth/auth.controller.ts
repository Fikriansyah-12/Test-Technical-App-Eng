import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import type { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, payload } = await this.service.login(dto);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return {
      message: "Login success",
      user: payload
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  profile(@Req() req: Request) {
    return {
      authenticated: true,
      user: req.user
    }
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token");
    return { message: "Logout success" };
  }
}
