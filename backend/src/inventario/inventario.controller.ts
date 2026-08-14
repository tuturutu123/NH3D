import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('inventario')
export class InventarioController {
  constructor(private prisma: PrismaService) {}

  @Get('productos')
  async listProductos() {
    return this.prisma.producto.findMany();
  }

  @Patch('producto/:id/stock')
  async updateStock(@Param('id') id: string, @Body() body: any) {
    const pid = Number(id);
    const { stock } = body;
    return this.prisma.producto.update({ where: { id: pid }, data: { stock } });
  }

  @Get('productos/agotados')
  async lowStock() {
    return this.prisma.producto.findMany({ where: { stock: { lt: 5 } } });
  }
}
