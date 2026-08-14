import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('envios')
export class EnviosController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() body: any) {
    // body: { pedidoId, metodo, costo, tracking }
    return this.prisma.envio.create({ data: body });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.prisma.envio.update({ where: { id: Number(id) }, data: body });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.envio.findUnique({ where: { id: Number(id) } });
  }
}
