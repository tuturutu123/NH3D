import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCuponDto } from './dto/create-cupon.dto';
import { UpdateCuponDto } from './dto/update-cupon.dto';

@Injectable()
export class CuponesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCuponDto) {
    const existe = await this.prisma.cupon.findFirst({
      where: { codigo: dto.codigo.trim().toUpperCase() },
    });

    if (existe) {
      throw new ConflictException('El código de cupón ya existe');
    }

    return this.prisma.cupon.create({
      data: {
        codigo: dto.codigo.trim().toUpperCase(),
        descuento: dto.descuento,
        activo: dto.activo ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.cupon.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cupon = await this.prisma.cupon.findUnique({ where: { id } });
    if (!cupon) {
      throw new NotFoundException('Cupón no encontrado');
    }
    return cupon;
  }

  async update(id: number, dto: UpdateCuponDto) {
    const data: {
      codigo?: string;
      descuento?: number;
      activo?: boolean;
    } = {};
    if (dto.codigo !== undefined) {
      data.codigo = dto.codigo.trim().toUpperCase();
      const existe = await this.prisma.cupon.findFirst({
        where: { codigo: data.codigo },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException('El código de cupón ya existe');
      }
    }
    if (dto.descuento !== undefined) data.descuento = dto.descuento;
    if (dto.activo !== undefined) data.activo = dto.activo;

    return this.prisma.cupon.update({ where: { id }, data });
  }

  async remove(id: number) {
    const cupon = await this.prisma.cupon.findUnique({ where: { id } });
    if (!cupon) {
      throw new NotFoundException('Cupón no encontrado');
    }
    return this.prisma.cupon.delete({ where: { id } });
  }
}
