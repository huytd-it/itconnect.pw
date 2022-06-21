import {CreateTaggedOutput, PageInput, PageOutput, SearchPageOutput, TaggedInput} from "./common";

export class Position extends TaggedInput {
}

export class PositionSearchInput extends PageInput<Position> {}

export class PositionSearchOutput extends SearchPageOutput {
}
