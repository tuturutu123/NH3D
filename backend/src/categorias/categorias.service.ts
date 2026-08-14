import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const existe = await this.prisma.categoria.findFirst({
      where: { nombre: createCategoriaDto.nombre },
    });

    if (existe) {
      throw new ConflictException('La categoría ya existe');
    }

    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    // Devuelve todas las categorías e incluye la cantidad de productos asociados a cada una
    return this.prisma.categoria.findMany({
      include: {
        _count: {
          select: { productos: true },
        },
      },
    });
  }

  async remove(id: number) {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });

    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
