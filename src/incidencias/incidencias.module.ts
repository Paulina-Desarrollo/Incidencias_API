import { Module } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasController } from './incidencias.controller';
import { DatabaseModule } from 'src/db/db.module';
//CARPETA DE PRUEBA NO USAR SU MODULO EN EL MODULE APP
@Module({
  imports: [DatabaseModule],
  providers: [IncidenciasService],
  controllers: [IncidenciasController]
})
export class IncidenciasModule {}
