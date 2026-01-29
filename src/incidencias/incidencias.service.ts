import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { resJsonType, SpResponse } from 'src/types/resJson';
import { resJsonClass } from 'src/utils/resJsonClass';

import { DatabaseService } from 'src/db/db.service';
import { CreateCatClaBodDto } from './dto/create-catbod';
import { CatClaBod } from './entity/incidencias.entity';
//CARPETA DE PRUEBA NO USAR SU MODULO EN EL MODULE APP/////////////////////////////////
@Injectable()
export class IncidenciasService {

  public ApiJson = new resJsonClass();

  constructor(private readonly databaseService: DatabaseService) {}

  async agregarEstatus(dto: CreateCatClaBodDto): Promise<resJsonType> {
    try {
      const { DESCLABOD, UsuarioAlta } = dto;

      // Ejecutamos el SP
      const result = await this.databaseService.ejecutarSP(
        'SP_GV_AgregarCatClaBod',
        { DesClaBod: DESCLABOD, UsuarioAlta }
      );

      // Tomamos el primer elemento del resultado
      const [res] = result as SpResponse<CatClaBod[]>[];

      // Si hubo error, lanzamos excepción
      if (res.error) {
        this.ApiJson.customeHttpExeption(res.mensaje, 400);
      }

      // Mapear a resJsonType para compatibilidad con ApiJson
      const response = this.ApiJson.customeResSuccess('Registro agregado', res);

      return response;

    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        `Error: ${error['message'] || 'Ocurrió un error interno'}`
      );
    }
  }

  async obtenerAllEstatus():Promise<resJsonType>{
    try {
          // Ejecutamos el SP
          const res =  await this.databaseService.ejecutarSP('SP_GV_ObtenerEstatus');
          if (res.length === 0) this.ApiJson.customeHttpExeption("No se encontro el Estatus", HttpStatus.NOT_FOUND);
          const response = this.ApiJson.customeResSuccess('Registro agregado', res);

      return response;


    } catch (error) {
      
        throw new InternalServerErrorException(
      `Error: ${error['message'] || 'Ocurrió un error interno'}`
    );
    }
}


async cancerlarApartadosVencidos(){
  try {

    
  } catch (error) {
            throw new InternalServerErrorException(
      `Error: ${error['message'] || 'Ocurrió un error interno'}`
    );
    
  }
}


}






