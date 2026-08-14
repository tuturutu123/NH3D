import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.categoria.findMany({
      include: {
        _count: {
          select: { productos: true },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  @Post()
  async create(@Body() body: { nombre: string }) {
    if (!body.nombre) {
      throw new NotFoundException('El nombre de la categoría es obligatorio');
    }

    return this.prisma.categoria.create({
      data: { nombre: body.nombre },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const categoriaId = Number(id);

    // Verificamos si tiene productos asociados
    const productosAsociados = await this.prisma.producto.count({
      where: { categoriaId },
    });

    if (productosAsociados > 0) {
      throw new Error(
        'No se puede eliminar una categoría que tiene productos asociados.',
      );
    }

    return this.prisma.categoria.delete({
      where: { id: categoriaId },
    });
  }
}
