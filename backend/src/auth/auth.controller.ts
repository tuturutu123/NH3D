import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 300000 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Public()
  @Get('init')
  initAdmin(
    @Query('email') email?: string,
    @Query('password') password?: string,
    @Query('secret') secret?: string,
  ) {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException('Endpoint no disponible en producción');
    }
    const expectedSecret = process.env.INIT_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      throw new ForbiddenException('Secret inválido o no configurado');
    }
    return this.authService.createInitialAdmin(email, password);
  }
}
