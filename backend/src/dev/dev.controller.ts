import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('dev')
export class DevController {
  constructor(private prisma: PrismaService) {}

  @Post('assign-images')
  async assignImages() {
    const mapping: Record<number, string> = {
      1: 'http://localhost:3000/categorias/mates.png',
      2: 'http://localhost:3000/categorias/yerba.png',
      3: 'http://localhost:3000/categorias/snacks.png',
    };

    const productos = await this.prisma.producto.findMany();
    for (const p of productos) {
      if (!p.imagenUrl) {
        const url =
          mapping[p.categoriaId] || 'http://localhost:3000/portada.png';
        await this.prisma.producto.update({
          where: { id: p.id },
          data: { imagenUrl: url },
        });
      }
    }

    return { message: 'Imagenes asignadas a productos sin imagen' };
  }
}
