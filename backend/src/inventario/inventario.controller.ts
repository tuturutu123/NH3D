import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private prisma: PrismaService) {}

  @Get('productos')
  async listProductos() {
    return this.prisma.producto.findMany({
      select: {
        id: true,
        nombre: true,
        precio: true,
        stock: true,
        estado: true,
        imagenUrl: true,
        categoriaId: true,
      },
    });
  }

  @Patch('producto/:id/stock')
  async updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    const pid = Number(id);
    return this.prisma.producto.update({
      where: { id: pid },
      data: { stock: dto.stock },
      select: { id: true, nombre: true, stock: true },
    });
  }

  @Get('productos/agotados')
  async lowStock() {
    return this.prisma.producto.findMany({
      where: { stock: { lt: 5 } },
      select: {
        id: true,
        nombre: true,
        stock: true,
        precio: true,
        imagenUrl: true,
      },
    });
  }
}
