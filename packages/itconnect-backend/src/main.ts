import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const config = new DocumentBuilder()
      .setTitle('ITConnect')
      .setDescription('ITConnect description')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
