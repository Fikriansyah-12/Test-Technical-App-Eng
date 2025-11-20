import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exist = await this.prisma.user.findUnique({
      where: { username: dto.username }
    });
    if (exist) throw new BadRequestException("Username already exists");

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hash,
      }
    });

    return {
      message: "User created",
      user: {
        id: user.id,
        username: user.username
      }
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username }
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const payload = {
      id: user.id,
      username: user.username
    };

    const token = await this.jwt.signAsync(payload);

    return { token, payload };
  }
}
