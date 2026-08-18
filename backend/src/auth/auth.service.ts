import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
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

    const payload = { sub: user.id, email: user.email, rol: user.rol };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        email: user.email,
        rol: user.rol,
      },
    };
  }

  // Método auxiliar para inicializar el administrador con las nuevas credenciales.
  // Se pueden pasar mediante variables de entorno INIT_ADMIN_EMAIL e INIT_ADMIN_PASS.
  async createInitialAdmin(emailParam?: string, passwordParam?: string) {
    const emailAdmin =
      emailParam ||
      process.env.INIT_ADMIN_EMAIL ||
      'santiagoheredia2000@gmail.com';
    const plainPassword =
      passwordParam || process.env.INIT_ADMIN_PASS || 'Mado.santi2005';
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
