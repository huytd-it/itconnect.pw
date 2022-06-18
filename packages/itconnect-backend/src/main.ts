import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  /**
   * Config CORS
   *
   */
  const whitelist = [
    'https://itconnect.pw',
    'https://api.itconnect.pw',
    'http://localhost:4200',
    'http://localhost:3000'
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error())
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });

  /**
   * Config swagger
   *
   */
  const config = new DocumentBuilder()
      .setTitle('ITConnect')
      .setDescription('ITConnect description')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth')
      .addTag('profile')
      .addTag('permission')
      .addTag('address')
      .addTag('skill')
      // .addTag('user-skill')
      .addTag('position')
      // .addTag('user-position')
      .addTag('work-from')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  /**
   * Listen
   *
   */
  const logger = new Logger('app');
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT'));
  logger.log('Server stated!');
}
bootstrap();
