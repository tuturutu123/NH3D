import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto, imagenUrl?: string) {
    return this.prisma.producto.create({
      data: {
        ...createProductoDto,
        imagenUrl,
      },
    });
  }

  findAll() {
    return this.prisma.producto.findMany({
      include: { categoria: true },
      orderBy: { id: 'desc' },
    });
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
    imagenUrl?: string,
  ) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    const dataToUpdate: any = { ...updateProductoDto };
    if (imagenUrl) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dataToUpdate.imagenUrl = imagenUrl;
    }

    return this.prisma.producto.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return this.prisma.producto.delete({
      where: { id },
    });
  }
}
