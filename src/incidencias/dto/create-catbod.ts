import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCatClaBodDto {

        @IsString()
        @IsNotEmpty()
        @ApiProperty({ description: 'DesClaBod' })
        DESCLABOD: string;
        @IsString()
        @IsNotEmpty()
        @ApiProperty({ description: ' UsuarioAlta' })
        UsuarioAlta: string;
       


}