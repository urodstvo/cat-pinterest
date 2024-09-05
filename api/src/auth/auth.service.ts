import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './entities/user.entity';
import { AuthDTO } from './dto/auth.dto';

import { Repository } from 'typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async auth(data: AuthDTO) {
    const existingUser = await this.usersRepository.findOne({
      where: {
        login: data.login,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      const isPasswordsValid = compareSync(
        data.password,
        existingUser.password,
      );
      if (isPasswordsValid) {
        return {
          token: this.jwtService.sign({ id: existingUser.id }),
          user: existingUser,
        };
      } else {
        throw new MethodNotAllowedException('Invalid input');
      }
    }

    const hashedPassword = hashSync(data.password, genSaltSync());
    const user = new UserEntity();
    user.login = data.login;
    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return { token: this.jwtService.sign({ id: user.id }), user };
  }

  async validateUser(login: string, password: string) {
    const user: UserEntity = await this.usersRepository.findOneBy({ login });
    if (!user) throw new MethodNotAllowedException('Invalid input');

    const isMatch: boolean = compareSync(password, user.password);
    if (!isMatch) throw new MethodNotAllowedException('Invalid input');

    return user;
  }
}
