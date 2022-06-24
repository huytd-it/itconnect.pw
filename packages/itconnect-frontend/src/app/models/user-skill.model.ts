import {Skill} from "./skill.model";

export class UserSkill {
  id: number;
  level: number;
  skill: Skill;
  name?: string; // refactor data
}

export class CreateOrEditUserSkillOutput {
  id?: number;
  level: number;
  skill?: number;
}
