import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { EnviosModule } from './envios/envios.module';
import { ReportesModule } from './reportes/reportes.module';
import { InventarioModule } from './inventario/inventario.module';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [
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
    DevModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
