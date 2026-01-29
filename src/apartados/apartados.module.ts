import { Module } from '@nestjs/common';
import { ApartadosService } from './apartados.service';
import { ApartadosController } from './apartados.controller';
import { DatabaseModule } from 'src/db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [ApartadosService],
  controllers: [ApartadosController]
})
export class ApartadosModule { }
