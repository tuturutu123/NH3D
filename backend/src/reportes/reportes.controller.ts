import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('reportes')
export class ReportesController {
  constructor(private prisma: PrismaService) {}

  @Get('resumen')
  async resumen() {
    const totalVentas = await this.prisma.pedido.aggregate({
      _sum: { total: true },
    });
    const pedidosCount = await this.prisma.pedido.count();
    const productosCount = await this.prisma.producto.count();
    const clientesCount = await this.prisma.usuario.count();

    return {
      totalVentas: totalVentas._sum.total || 0,
      pedidosCount,
      productosCount,
      clientesCount,
    };
  }
}
