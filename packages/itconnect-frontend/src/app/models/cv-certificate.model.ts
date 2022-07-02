import {Certificate} from "./certificate.model";
import {UserCertificate} from "./user-certificate.model";

export class CvCertificate {
    id: number;
    year: number;
    content: string;
    certificate: Certificate;
}

export class CreateOrEditCvCertificate {
    id?: number;
    year: number;
    content: string;
    certificate: number;
}
