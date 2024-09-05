import { Body, Controller, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Post()
  async auth(@Body() dto: AuthDTO, @Res() response: Response) {
    const { token, user } = await this.usersService.auth(dto);
    response.setHeader('X-Auth-Token', token);

    return response.status(201).json({ user });
  }
}
