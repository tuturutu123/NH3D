import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/public.decorator';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@Controller('envios')
export class EnviosController {
  constructor(private prisma: PrismaService) {}

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

  @Public()
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.envio.findUnique({
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
  }
}
