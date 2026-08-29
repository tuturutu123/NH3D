import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Req,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

const pedidoInclude = {
  items: {
    include: {
      producto: {
        select: { id: true, nombre: true, precio: true, imagenUrl: true },
      },
    },
  },
  usuario: { select: { id: true, email: true } },
  envio: {
    select: {
      id: true,
      metodo: true,
      costo: true,
      tracking: true,
      estado: true,
    },
  },
};

@Controller('pedidos')
export class PedidosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.pedido.findMany({ include: pedidoInclude });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: pedidoInclude,
    });
  }

  @Post()
  async create(@Body() dto: CreatePedidoDto, @Req() req: Request) {
    const user = req['user'] as { sub: number };
    const usuarioId = user.sub;

    const pedido = await this.prisma.pedido.create({
      data: {
        usuarioId,
        total: dto.total,
        items: {
          create: dto.items.map((it) => ({
            productoId: it.productoId,
            cantidad: it.cantidad,
            precioUnit: it.precioUnit,
          })),
        },
      },
      include: { items: true },
    });

    for (const it of dto.items) {
      const data: Prisma.ProductoUpdateInput = {
        stock: { decrement: it.cantidad },
      };
      await this.prisma.producto.update({
        where: { id: it.productoId },
        data,
      });
    }

    return pedido;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePedidoDto) {
    const pedidoId = Number(id);
    const pedido = await this.prisma.pedido.findUnique({
      where: { id: pedidoId },
    });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return this.prisma.pedido.update({
      where: { id: pedidoId },
      data: dto,
      include: pedidoInclude,
    });
  }
}
