import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.pedido.findMany({
      include: {
        items: { include: { producto: true } },
        usuario: { select: { id: true, email: true } },
        envio: true,
      },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const pid = Number(id);
    return this.prisma.pedido.findUnique({
      where: { id: pid },
      include: {
        items: { include: { producto: true } },
        usuario: { select: { id: true, email: true } },
        envio: true,
      },
    });
  }

  @Post()
  async create(@Body() body: any) {
    // body: { usuarioId, items: [{productoId, cantidad, precioUnit}], total }
    const { usuarioId, items, total } = body;
    const pedido = await this.prisma.pedido.create({
      data: {
        usuarioId,
        total,
        items: {
          create: items.map((it: any) => ({
            productoId: it.productoId,
            cantidad: it.cantidad,
            precioUnit: it.precioUnit,
          })),
        },
      },
      include: { items: true },
    });

    // Decrement stock for productos
    for (const it of items) {
      await this.prisma.producto.update({
        where: { id: it.productoId },
        data: { stock: { decrement: it.cantidad } } as any,
      });
    }

    return pedido;
  }
}
