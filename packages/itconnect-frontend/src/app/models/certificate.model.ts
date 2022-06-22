import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Certificate {
  id: number;
  name: string;

  // add more
}

export class CertificateSearchInput extends PageInput<Certificate> {}

export class CertificateSearchOutput extends SearchPageOutput {
}
