import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Skill {
  id: number;
  name: string;
  jobSkillCount: number;
  userSkillCount: number;

  // add more
}

export class SkillSearchInput extends PageInput<Skill> {}

export class SkillSearchOutput extends SearchPageOutput {
}
