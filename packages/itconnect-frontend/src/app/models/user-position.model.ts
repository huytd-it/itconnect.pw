import {Position} from "./position.model";

export class UserPosition {
  id: number;
  level: number;
  position: Position;
  name?: string; // refactor data
}

export class CreateOrEditUserPositionOutput {
  id?: number;
  level: number;
  position?: number;
}
