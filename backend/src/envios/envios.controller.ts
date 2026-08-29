import {
  Controller,
  Post,
  Patch,
  Param,
  Body,
  Get,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@Controller('envios')
export class EnviosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.envio.findMany({
      include: {
        pedido: {
          select: { id: true, total: true, estado: true, creadoAt: true },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  @Post()
  async create(@Body() dto: CreateEnvioDto) {
    return this.prisma.envio.create({
      data: {
        pedidoId: dto.pedidoId,
        metodo: dto.metodo,
        costo: dto.costo,
        tracking: dto.tracking,
      },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEnvioDto) {
    return this.prisma.envio.update({
      where: { id: Number(id) },
      data: dto,
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const envio = await this.prisma.envio.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        pedidoId: true,
        metodo: true,
        costo: true,
        tracking: true,
        estado: true,
      },
    });
    if (!envio) {
      throw new NotFoundException('Envío no encontrado');
    }
    return envio;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const envioId = Number(id);
    const envio = await this.prisma.envio.findUnique({
      where: { id: envioId },
    });
    if (!envio) {
      throw new NotFoundException('Envío no encontrado');
    }
    return this.prisma.envio.delete({ where: { id: envioId } });
  }
}
