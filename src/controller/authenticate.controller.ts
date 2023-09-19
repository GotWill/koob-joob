import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcryptjs';

@Controller('sessions')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(@Body() body: Prisma.AutCreateInput) {
    const { email, password } = body;

    //Inserir manualmente usuario e senha com hash no banco para funcionar

    const userExist = await this.prismaService.aut.findUnique({
      where: {
        email,
      },
    });

    const isPasswordValid = await compare(password, userExist.password);

    if (!userExist) {
      return new UnauthorizedException('user credentials do not watch');
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.');
    }
    const accessToken = this.jwt.sign({ sub: userExist.id });

    return {
      access_token: accessToken,
    };
  }
}
