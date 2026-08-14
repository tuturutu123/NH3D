import { Module } from '@nestjs/common';
import { EnviosController } from './envios.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EnviosController],
})
export class EnviosModule {}
