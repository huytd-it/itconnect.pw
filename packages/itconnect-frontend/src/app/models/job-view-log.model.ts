import {User} from "./user.model";
import {Job} from "./job.model";

export class JobViewLog {
  id: number
  user: User;
  job: Job;
  createdAt: Date;
}

export class JobViewLogInput {
  legend: string;
  countView: number;
  countUnique: number;
}
