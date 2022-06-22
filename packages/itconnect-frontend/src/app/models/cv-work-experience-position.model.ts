import {Position} from "./position.model";

export class CvWorkExperienceDto {
    id: number;
    position: Position;
    cvWorkExperience: number;
}

export class CreateOrEditCvWorkExperiencePosition {
    id?: number;
    position?: number;
    cvWorkExperience?: number;
}
