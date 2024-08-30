/* eslint-disable indent */
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
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
