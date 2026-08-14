import { Module } from '@nestjs/common';
import { InventarioController } from './inventario.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InventarioController],
})
export class InventarioModule {}
