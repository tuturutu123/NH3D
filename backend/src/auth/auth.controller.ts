import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('init')
  initAdmin(
    @Query('email') email?: string,
    @Query('password') password?: string,
    @Query('secret') secret?: string,
  ) {
    const expectedSecret = process.env.INIT_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      throw new ForbiddenException('Secret inválido o no configurado');
    }
    return this.authService.createInitialAdmin(email, password);
  }
}
