import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { UserEntity } from '../entities/user.entity';

import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login', passReqToCallback: true });
  }

  async validate(login: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(login, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
