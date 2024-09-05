import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Post()
  async register(@Body() dto: SignUpDto, @Res() response: Response) {
    const { token } = await this.usersService.signup(dto);
    return response.json(token);
  }

  async login(@Body() dto: SignInDto, @Res() response: Response) {
    const { token } = await this.usersService.login(dto);
    return response.json(token);
  }
}
