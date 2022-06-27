import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import {JobService} from "../../services/job.service";
import {ServicesModule} from "../../services/services.module";

@Module({
  imports: [ServicesModule],
  controllers: [PeopleController]
})
export class PeopleModule {}
