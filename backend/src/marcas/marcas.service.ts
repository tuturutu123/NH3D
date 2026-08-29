import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMarcaDto) {
    const existe = await this.prisma.marca.findFirst({
      where: { nombre: dto.nombre },
    });

    if (existe) {
      throw new ConflictException('La marca ya existe');
    }

    return this.prisma.marca.create({ data: dto });
  }

  findAll() {
    return this.prisma.marca.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const marca = await this.prisma.marca.findUnique({ where: { id } });
    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }
    return marca;
  }

  async update(id: number, dto: UpdateMarcaDto) {
    if (dto.nombre !== undefined) {
      const existe = await this.prisma.marca.findFirst({
        where: { nombre: dto.nombre },
      });

      if (existe && existe.id !== id) {
        throw new ConflictException('La marca ya existe');
      }
    }

    return this.prisma.marca.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const marca = await this.prisma.marca.findUnique({ where: { id } });
    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }
    return this.prisma.marca.delete({ where: { id } });
  }
}
