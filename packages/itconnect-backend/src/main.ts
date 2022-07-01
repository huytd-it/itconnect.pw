import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";
import {useContainer} from "class-validator";
import {ValidatorsModule} from "./validators/validators.module";
import {ExpressAdapter} from "@bull-board/express";
import * as expressBasicAuth from "express-basic-auth";
import {createBullBoard} from "@bull-board/api";
import {Queue} from "bull";
import {BullAdapter} from "@bull-board/api/bullAdapter";
import {QueuePointWithJob, QueuePointWithUser} from "./queues/queue.enum";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  /**
   * Fix class validators
   *
   *
   */
  useContainer(app.select(ValidatorsModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());

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
      .addTag('people')
      .addTag('permission')
      .addTag('address')
      .addTag('skill')
      .addTag('user-skill')
      .addTag('position')
      .addTag('user-position')
      .addTag('school')
      .addTag('certificate')
      .addTag('user-certificate')
      .addTag('work-from')
      .addTag('job-level')
      .addTag('job-type')
      .addTag('ranked-academic')
      .addTag('company-tag')
      .addTag('company-3rd')
      .addTag('cv-work-experience')
      .addTag('cv-work-experience-skill')
      .addTag('cv-work-experience-position')
      .addTag('cv-certificate')
      .addTag('cv-education')
      .addTag('job')
      .addTag('job-apply')
      .addTag('job-saved')
      .addTag('point-job-user')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  /**
   * Config bull
   *
   */
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/bull-board')

  const pwjQueue = app.get<Queue>(`BullQueue_${QueuePointWithJob}`)
  const pwuQueue = app.get<Queue>(`BullQueue_${QueuePointWithUser}`)
  createBullBoard({
    queues: [
      new BullAdapter(pwjQueue),
      new BullAdapter(pwuQueue),
    ],
    serverAdapter,
  })

  app.use(
      '/bull-board',
      expressBasicAuth({
        users: {
          [configService.get('BULL_USER')]: configService.get('BULL_PASSWORD'),
        },
        challenge: true,
      }),
      serverAdapter.getRouter()
  )

  /**
   * Listen
   *
   */
  const logger = new Logger('app');
  await app.listen(configService.get<number>('APP_PORT'));
  logger.log('Server stated!');
}
bootstrap();
