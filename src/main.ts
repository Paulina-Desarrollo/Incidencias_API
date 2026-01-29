import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableShutdownHooks()
  const options = new DocumentBuilder()
  .setTitle(configService.get<any>('app.nombre'))
  .setDescription('Api para gestión de Incidencias')
  .addBearerAuth(
  {
      type:'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
      },
      'access-token',
  )
  .build();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('',app, document);
  const cors ={
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE,OPTIONS',
  }
  app.enableCors(cors);
  await app.listen(configService.get<number>('app.puerto')?? 4000)
  }
  bootstrap();