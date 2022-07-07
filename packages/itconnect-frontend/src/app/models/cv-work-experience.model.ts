import {Position} from "./position.model";
import {Skill} from "./skill.model";
import {JobLevel} from "./job-level.model";
import {WorkFrom} from "./work-from.model";
import {CompanyTag} from "./company-tag.model";
import {JobType} from "./job-type.model";

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

export enum CvWorkExperienceStatus {
  NotVerify = 1,
  WaitVerify = 2,
  Verify = 3
}

export class CvWorkExperience {
    id: number;
    startDate: Date;
    endDate: Date;
    content: string;
    companyTag: CompanyTag;
    jobLevel: JobLevel;
    jobType: JobType;
    workFrom: WorkFrom;
    status: CvWorkExperienceStatus;
    cvWorkExperienceSkills: CvWorkExperienceSkill[];
    cvWorkExperiencePositions: CvWorkExperiencePosition[];
}

export class CreateOrEditCvWorkExperience {
    id?: number;
    startDate: Date;
    endDate?: Date;
    content: string;
    companyTag: number;
    jobLevel: number;
    jobType: number;
    workFrom: number;
    force?: boolean;
    status?: CvWorkExperienceStatus;
}
