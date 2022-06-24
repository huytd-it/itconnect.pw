import {School} from "./school.model";
import {RankedAcademic} from "./ranked-academic.model";


export class CvEducation {
    id: number;
    startDate: Date;
    endDate: Date;
    content: string;
    school: School;
    rankedAcademic: RankedAcademic;
    mark: number;
}

export class CreateOrEditCvEducation {
    id?: number;
    startDate: Date;
    endDate: Date;
    content: string;
    school: number;
    rankedAcademic: number;
    mark: number;
}
