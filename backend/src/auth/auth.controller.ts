import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class RegisterDto {
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsEmail() email: string;
  @IsNotEmpty() @MinLength(6) password: string;
  @IsNotEmpty() @MinLength(6) passwordConfirm: string;
}

class LoginDto {
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new Error('Passwords do not match');
    }
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user as any);
  }
}
