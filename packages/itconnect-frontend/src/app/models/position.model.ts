import {PageInput, PageOutput, SearchPageOutput} from "./common";

export class Position {
  id: number;
  name: string;

  // add more
}

export class PositionSearchInput extends PageInput<Position> {}

export class PositionSearchOutput extends SearchPageOutput {
}
