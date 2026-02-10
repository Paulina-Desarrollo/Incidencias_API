import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { resJsonClass } from 'src/utils/resJsonClass';
import { BajaApartadosVencidosDto } from './dto/baja-apartadosVencidos';
import { resJsonType } from 'src/types/resJson';

@Injectable()
export class ApartadosService {
    public ApiJson = new resJsonClass();

    constructor(private readonly databaseService: DatabaseService) { }
async bajaApartadosVencidosManual(CveProd: string): Promise<resJsonType> {
    try {
 
        const res = await this.databaseService.ejecutarSP(
            'SP_CancelaApartadosVencidos_Manual',
            { CveProd }
        );

                
      if (!res || res.length === 0) {
            throw this.ApiJson.customeHttpExeption(
                'El procedimiento no retornó datos',
                404
            );
        }
   const { success, mensaje } = res[0];

        return this.ApiJson.customeResSuccess(  mensaje,   res);

    } catch (error) {

       if (error instanceof HttpException) {
            throw error;
        }

        throw new InternalServerErrorException(
            error?.message || 'Ocurrió un error al ejecutar el procedimiento'
        );
    }
}


}
