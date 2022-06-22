import {Certificate} from "./certificate.model";

export class UserCertificate {
  id: number;
  level: number;
  certificate: Certificate;
  name?: string; // refactor data
}

export class CreateOrEditUserCertificateOutput {
  id?: number;
  level: number;
  certificate?: number;
}
