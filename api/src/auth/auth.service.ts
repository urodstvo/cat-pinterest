import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from './entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(data: SignUpDto) {
    const existingUser = await this.usersRepository.findOneBy({
      login: data.login,
    });

    if (existingUser)
      throw new BadRequestException('User with this login already exists');

    const hashedPassword = hashSync(
      data.password,
      this.configService.get('JWT_SECRET'),
    );
    const user = this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return { token: this.jwtService.sign({ id: user.id }) };
  }

  async login(data: SignInDto) {
    const user = await this.usersRepository.findOneBy({ login: data.login });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = compareSync(data.password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    return { token: this.jwtService.sign({ id: user.id }) };
  }

  async validateUser(login: string, password: string) {
    const user: UserEntity = await this.usersRepository.findOneBy({ login });
    if (!user) throw new BadRequestException('User not found');

    const isMatch: boolean = compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    return user;
  }
}
