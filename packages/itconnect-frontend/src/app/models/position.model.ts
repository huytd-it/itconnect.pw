import {CreateTaggedOutput, PageInput, PageOutput, SearchPageOutput, TaggedInput} from "./common";

export class Position extends TaggedInput {
  jobPositionCount: number;
  jobActivePositionCount: number;
  userPositionCount: number;
}

export class PositionSearchInput extends PageInput<Position> {
}

export class PositionSearchOutput extends SearchPageOutput {
  all?: boolean
}
