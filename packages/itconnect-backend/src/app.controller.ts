import {Controller, ForbiddenException, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  main(): string {
    throw new ForbiddenException()
  }
}
