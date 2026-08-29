import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async login(loginDto: LoginDto) {
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

    if (user.rol !== 'ADMIN') {
      throw new UnauthorizedException('No tenés permisos de administrador');
    }

    const code = this.otpService.generate(user.email);
    await this.otpService.sendEmail(user.email, code).catch((e: unknown) => {
      console.error(
        '[OTP] error enviando email:',
        e instanceof Error ? e.message : String(e),
      );
    });

    return {
      message: 'Código enviado. Revisá tu correo electrónico.',
      requiresOtp: true,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, res?: Response) {
    const email = verifyOtpDto.email;
    const valid = this.otpService.verify(email, verifyOtpDto.code);

    if (!valid) {
      throw new BadRequestException(
        'Código inválido o expirado. Intentá de nuevo.',
      );
    }

    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
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

  async resendOtp(email: string) {
    if (!email) {
      throw new BadRequestException('Email requerido');
    }
    const code = this.otpService.generate(email);
    await this.otpService.sendEmail(email, code).catch((e: unknown) => {
      console.error(
        '[OTP] error enviando email:',
        e instanceof Error ? e.message : String(e),
      );
    });
    return { message: 'Código reenviado. Revisá tu correo electrónico.' };
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
