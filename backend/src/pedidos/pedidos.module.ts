import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PedidosController],
})
export class PedidosModule {}
