import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncidenciasService } from './incidencias.service';
//CARPETA DE PRUEBA NO USAR SU MODULO EN EL MODULE APP
@Controller('incidencias')
@ApiTags('Catalogo Incidencias')
@Controller('Incidencias')
export class IncidenciasController {

    constructor(private readonly incidenciasService: IncidenciasService){}

      /* #region Get */
  @Get()
  @ApiOperation({ summary: 'Obtiene todos los Estatus.', description: 'Devuelve una lista de los estatus registrados' })
  findAll() {
    return this.incidenciasService.obtenerAllEstatus();
  }
  /* #endregion */


}

