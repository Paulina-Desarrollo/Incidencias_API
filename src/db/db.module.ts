import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from './db.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {

  constructor(private readonly databaseService: DatabaseService) {}

  // 🔹 Se ejecuta cuando el módulo se inicializa
  async onModuleInit() {
    await this.databaseService.init();
    console.log('DatabaseService inicializado');
  }

  // 🔹 Se ejecuta cuando la app se apaga
  async onModuleDestroy() {
    console.log('Cerrando conexión a la base de datos...');
    await this.databaseService.close();
  }
}
