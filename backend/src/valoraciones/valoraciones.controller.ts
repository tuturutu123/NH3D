import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
  NotFoundException,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/public.decorator';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { UpdateValoracionDto } from './dto/update-valoracion.dto';

@Controller('valoraciones')
export class ValoracionesController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Get()
  async findAll() {
    return this.prisma.valoracion.findMany({
      include: {
        producto: { select: { id: true, nombre: true, imagenUrl: true } },
        usuario: { select: { id: true, email: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  @Public()
  @Get('producto/:productoId')
  async findByProducto(@Param('productoId') productoId: string) {
    return this.prisma.valoracion.findMany({
      where: { productoId: Number(productoId) },
      include: { usuario: { select: { id: true, email: true } } },
      orderBy: { id: 'desc' },
    });
  }

  @Post()
  async create(@Body() dto: CreateValoracionDto, @Req() req: Request) {
    const user = req['user'] as { sub?: number } | undefined;
    const usuarioId = user?.sub;
    if (!usuarioId) {
      throw new NotFoundException('No se pudo identificar al usuario');
    }
    return this.prisma.valoracion.create({
      data: {
        productoId: dto.productoId,
        usuarioId,
        rating: dto.rating,
        comentario: dto.comentario,
      },
      include: {
        producto: { select: { id: true, nombre: true } },
        usuario: { select: { id: true, email: true } },
      },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const valoracionId = Number(id);
    const valoracion = await this.prisma.valoracion.findUnique({
      where: { id: valoracionId },
    });
    if (!valoracion) {
      throw new NotFoundException('Valoración no encontrada');
    }
    await this.prisma.valoracion.delete({ where: { id: valoracionId } });
    return { message: 'Valoración eliminada' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const valoracion = await this.prisma.valoracion.findUnique({
      where: { id: Number(id) },
      include: {
        producto: { select: { id: true, nombre: true } },
        usuario: { select: { id: true, email: true } },
      },
    });
    if (!valoracion) {
      throw new NotFoundException('Valoración no encontrada');
    }
    return valoracion;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateValoracionDto) {
    const valoracionId = Number(id);
    const valoracion = await this.prisma.valoracion.findUnique({
      where: { id: valoracionId },
    });
    if (!valoracion) {
      throw new NotFoundException('Valoración no encontrada');
    }
    return this.prisma.valoracion.update({
      where: { id: valoracionId },
      data: dto,
      include: {
        producto: { select: { id: true, nombre: true } },
        usuario: { select: { id: true, email: true } },
      },
    });
  }
}
