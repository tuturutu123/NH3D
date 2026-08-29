import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.guard';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { EnviosModule } from './envios/envios.module';
import { ReportesModule } from './reportes/reportes.module';
import { InventarioModule } from './inventario/inventario.module';
import { MarcasModule } from './marcas/marcas.module';
import { ValoracionesModule } from './valoraciones/valoraciones.module';
import { CuponesModule } from './cupones/cupones.module';
import { SettingsModule } from './settings/settings.module';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    CategoriasModule,
    ProductosModule,
    UsuariosModule,
    PedidosModule,
    EnviosModule,
    ReportesModule,
    InventarioModule,
    MarcasModule,
    ValoracionesModule,
    CuponesModule,
    SettingsModule,
    DevModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
