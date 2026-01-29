import { Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from 'src/db/db.service';
import { ApartadosService } from './apartados.service';


@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@ApiTags('Catalogo Apartados')
@Controller('apartados')
export class ApartadosController {
    constructor(private readonly apartados:ApartadosService){}
  /* #region Post */
  // Paulina May
  // Creacion 29/01/2026
  @Post(':CveProd')
    @ApiOperation({ summary: 'Dar de baja Apartados Vencidos' })
     bajaApartadosVencidosManual(@Param('CveProd') Cveprod: string) {
    return this.apartados.bajaApartadosVencidosManual(Cveprod)
  }

    /* #endregion */


}
