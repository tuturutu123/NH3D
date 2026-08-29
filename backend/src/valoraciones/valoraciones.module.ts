import { Module } from '@nestjs/common';
import { ValoracionesController } from './valoraciones.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ValoracionesController],
})
export class ValoracionesModule {}
