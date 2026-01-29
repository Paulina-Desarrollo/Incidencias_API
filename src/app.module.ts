import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuracion from './config/configuracion.config';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { ApartadosModule } from './apartados/apartados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuracion],
      envFilePath: '.env',
    }),

  /*   IncidenciasModule, */
    ApartadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

