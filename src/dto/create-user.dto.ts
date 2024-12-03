/* eslint-disable indent */
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  username: string;

  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;
}
