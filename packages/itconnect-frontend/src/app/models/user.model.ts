import {BaseTable} from "./common";
import {AppRole} from "./permission.model";

export class User extends BaseTable {
  id: number;
  email: string;
  role: AppRole;
}
