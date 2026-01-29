import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      console.log(CveProd);
        const res = await this.databaseService.ejecutarSP(
            'SP_CancelaApartadosVencidos_Manual',
            { CveProd }
        );

       console.log(res);
        if (!res || res.length === 0) {
            return this.ApiJson.customeResSuccess(
                'respuesta',
                { success: 0, mensaje: 'El procedimiento no retornó datos' }
            );
        }

        const { success, mensaje } = res[0];

        return this.ApiJson.customeResSuccess('respuesta', {
            success,
            mensaje
        });

    } catch (error) {

        // Cuando el SP usa THROW o RAISERROR
        throw new InternalServerErrorException(
            error?.message || 'Ocurrió un error al ejecutar el procedimiento'
        );
    }
}


}
