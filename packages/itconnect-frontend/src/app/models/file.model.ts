import {BaseTable} from "./common";

export class File extends BaseTable {
  id: number;
  slug: string;
  mime: string;
  size: number;
}
