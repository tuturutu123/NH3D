import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportesController],
})
export class ReportesModule {}
