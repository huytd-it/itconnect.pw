import {Skill} from "./skill.model";

export class CvWorkExperience {
    id: number;
    skill: Skill;
    cvWorkExperience: number;
}

export class CreateOrEditCvWorkExperienceSkill {
    id?: number;
    skill?: number;
    cvWorkExperience?: number;
}
