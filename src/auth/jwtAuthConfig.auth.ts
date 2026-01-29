import { Injectable, UnauthorizedException, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DatabaseService } from "src/db/db.service"; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
  constructor(
    private readonly db: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
    });
  }

  // Se ejecuta automáticamente cuando el módulo se inicializa
  async onModuleInit() {
    // Inicializa la DB con configuración por defecto (variables de entorno)
    await this.db.init();
  }

  async validate(payload: { correo: string }) {
    // Aquí ya podemos usar el pool sin problemas
    const resultado = await this.db.ejecutarSP(
      "sp_usuario_por_correo",
      { correo: payload.correo }
    );

    if (!resultado || resultado.length === 0) {
      throw new UnauthorizedException("Usuario no válido");
    }

    return resultado[0]; // se asigna a req.user
  }
}
