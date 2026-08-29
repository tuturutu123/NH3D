import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/public.decorator';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

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
    const existe = await this.prisma.categoria.findFirst({
      where: { nombre: dto.nombre },
    });
    if (existe) {
      throw new ConflictException('La categoría ya existe');
    }
    return this.prisma.categoria.create({
      data: { nombre: dto.nombre },
      select: { id: true, nombre: true },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: Number(id) },
      include: { _count: { select: { productos: true } } },
    });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return categoria;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    const categoriaId = Number(id);
    const existe = await this.prisma.categoria.findUnique({
      where: { id: categoriaId },
    });
    if (!existe) {
      throw new NotFoundException('Categoría no encontrada');
    }
    if (dto.nombre !== undefined) {
      const duplicada = await this.prisma.categoria.findFirst({
        where: { nombre: dto.nombre },
      });
      if (duplicada && duplicada.id !== categoriaId) {
        throw new ConflictException('La categoría ya existe');
      }
    }
    return this.prisma.categoria.update({
      where: { id: categoriaId },
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
