import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Skill {
  id: number;
  name: string;

  // add more
}

export class SkillSearchInput extends PageInput<Skill> {}

export class SkillSearchOutput extends SearchPageOutput {
}
