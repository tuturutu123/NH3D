import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, res?: Response) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    if (res) {
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });
    }

    return {
      user: {
        email: user.email,
        rol: user.rol,
      },
    };
  }

  async createInitialAdmin(emailParam?: string, passwordParam?: string) {
    const emailAdmin = emailParam || process.env.INIT_ADMIN_EMAIL;
    const plainPassword = passwordParam || process.env.INIT_ADMIN_PASS;

    if (!emailAdmin || !plainPassword) {
      throw new UnauthorizedException(
        'Credenciales no configuradas. Setear INIT_ADMIN_EMAIL e INIT_ADMIN_PASS en .env',
      );
    }
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await this.prisma.usuario.upsert({
      where: { email: emailAdmin },
      update: { password: hashedPassword },
      create: {
        email: emailAdmin,
        password: hashedPassword,
        rol: 'ADMIN',
      },
    });

    return {
      message: 'Administrador configurado exitosamente',
      email: admin.email,
    };
  }
}
