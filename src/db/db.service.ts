// database.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as sql from "mssql";

export interface DbConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options?: sql.config["options"];
}

@Injectable()
export class DatabaseService {
  private pool: sql.ConnectionPool | null = null;
  private isConnected = false;

  constructor() {}

  /**
   * Inicializa el pool con la configuración que le pases
   * Si no se pasa config, usa valores por defecto de entorno
   */
  async init(config?: DbConfig) {
    if (this.isConnected && this.pool) return; // si ya está conectado, no hace nada

    const defaultConfig: DbConfig = {
      user: process.env.DB_USER ?? '',
      password: process.env.DB_PASSWORD ?? '',
      server: process.env.DB_HOST ?? '',
      database: process.env.DB_NAME ?? '',
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    this.pool = new sql.ConnectionPool(config ?? defaultConfig);

    try {
      await this.pool.connect();
      this.isConnected = true;
      console.log("Conectado a SQL Server correctamente");
    } catch (err) {
      console.error("Error conectando a SQL Server", err);
      throw new InternalServerErrorException("No se pudo conectar a la base de datos");
    }
  }

  /**
   * Ejecuta un procedimiento almacenado
   */
  async ejecutarSP(nombre: string, params: Record<string, any> = {}) {
    if (!this.pool || !this.isConnected) {
      throw new InternalServerErrorException("El pool de base de datos no está inicializado");
    }

    try {
      const request = this.pool.request();
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });

      const result = await request.execute(nombre);
      return result.recordset;
    } catch (error) {
      console.error("Error ejecutando SP:", error);
      throw new InternalServerErrorException("Error ejecutando procedimiento almacenado");
    }
  }

  /**
   * Cierra la conexión (opcional)
   */
  async close() {
    if (this.pool && this.isConnected) {
      await this.pool.close();
      this.isConnected = false;
      console.log("Conexión SQL Server cerrada");
    }
  }
}
