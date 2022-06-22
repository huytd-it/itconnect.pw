import {Position} from "./position.model";
import {Skill} from "./skill.model";
import {JobLevel} from "./job-level.model";
import {WorkFrom} from "./work-from.model";
import {CompanyTag} from "./company-tag.model";

export class CvWorkExperiencePosition {
    id: number
    position: Position;
    name?: string; // refactor
}

export class CvWorkExperienceSkill {
    id: number
    skill: Skill;
    name?: string; // refactor
}

export class CvWorkExperience {
    id: number;
    startDate: Date;
    endDate: Date;
    content: string;
    companyTag: CompanyTag;
    jobLevel: JobLevel;
    workFrom: WorkFrom;
    cvWorkExperienceSkills: CvWorkExperienceSkill[];
    cvWorkExperiencePositions: CvWorkExperiencePosition[];
}

export class CreateOrEditCvWorkExperience {
    id?: number;
    startDate: Date;
    endDate: Date;
    content: string;
    companyTag: number;
    jobLevel: number;
    workFrom: number;
}
