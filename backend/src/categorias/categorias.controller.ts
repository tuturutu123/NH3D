import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/public.decorator';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private prisma: PrismaService) {}

  @Public()
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
  async create(@Body() dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: { nombre: dto.nombre },
      select: { id: true, nombre: true },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const categoriaId = Number(id);

    const productosAsociados = await this.prisma.producto.count({
      where: { categoriaId },
    });

    if (productosAsociados > 0) {
      throw new BadRequestException(
        'No se puede eliminar una categoría que tiene productos asociados.',
      );
    }

    return this.prisma.categoria.delete({
      where: { id: categoriaId },
      select: { id: true, nombre: true },
    });
  }
}
