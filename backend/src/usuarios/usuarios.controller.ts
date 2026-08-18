import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.usuario.findMany({
      select: { id: true, email: true, rol: true },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const uid = Number(id);
    return this.prisma.usuario.findUnique({
      where: { id: uid },
      select: { id: true, email: true, rol: true },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const uid = Number(id);
    const data: any = {};
    if (body.email) data.email = body.email;
    if (body.rol) data.rol = body.rol;
    return this.prisma.usuario.update({
      where: { id: uid },
      data,
      select: { id: true, email: true, rol: true },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const uid = Number(id);
    await this.prisma.usuario.delete({ where: { id: uid } });
    return { message: 'Usuario eliminado' };
  }
}
