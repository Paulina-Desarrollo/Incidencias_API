import { JwtModule } from '@nestjs/jwt';
import {  ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwtAuthConfig.auth';


@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: '5m',
        },
      }
    ),
    }),

  ],
  controllers: [AuthController],
  providers:[AuthService, JwtStrategy]

})
export class AuthModule {}
