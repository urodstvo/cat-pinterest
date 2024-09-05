import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3, { message: 'Логин должен быть не короче 3 символов' })
  login: string;

  @IsString()
  @MinLength(6, { message: 'Слишком короткий пароль' })
  password: string;
}
