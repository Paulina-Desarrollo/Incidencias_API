import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt"; 
import * as jwt from 'jsonwebtoken';
import { payLoadToken } from "src/types/types";

// Servicio que ejecutara funciones para generar y validar los tokens de jwt
@Injectable() 
export class JwtServiceCustom {   

    constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
 

    private _tokenPayload: object;  

   validateToken(token: string): payLoadToken | false {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });
      return payload;
    } catch (err) {
      return false;
    }
  }

/*     generateToken(Usuario: string, UsuarioId: number, GrupoPermisoId: number, timeExpire: string): string {
      let payLoad = { Usuario, UsuarioId, GrupoPermisoId };
      const secret = (this.configService.get<string>('jwt.secret') ?? 'none') as string;
  const token = jwt.sign(payLoad, secret, { expiresIn: timeExpire });
  return token;
    };  */



    
    // Setter para almacenar la informacion del token esto nos servira para compartir de manera global dicha informacion
    set payloadToken(payLoad: object){ 
      this._tokenPayload = payLoad 
    } 

    // Getter para obtener la informacion del token
    get payloadToken() { 
      return this._tokenPayload
    }
    
};
