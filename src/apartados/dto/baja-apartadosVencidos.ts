import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BajaApartadosVencidosDto{

         @IsString()
            @IsNotEmpty()
            @ApiProperty({ description: 'CveProd' })
            CveProd: string;
}