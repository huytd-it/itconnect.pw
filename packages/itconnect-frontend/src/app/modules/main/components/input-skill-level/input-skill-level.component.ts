import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {OptionItem, PageInput, SearchPageOutput} from "../../../../models/common";
import {Observable} from "rxjs";
import {MatSliderChange} from "@angular/material/slider";

export interface SkillLevelItem {
  name: string;
  level: number;
}

@Component({
  selector: 'app-input-skill-level',
  templateUrl: './input-skill-level.component.html',
  styleUrls: ['./input-skill-level.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSkillLevelComponent),
      multi: true
    }
  ]
})
export class InputSkillLevelComponent implements OnInit, ControlValueAccessor {
  isAdding: boolean;
  tags: SkillLevelItem[] = [];
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;

  private funcChangeControlValue: (data: any) => void;

  constructor() { }

  ngOnInit(): void {
  }

  addTag(tag: string) {
    this.isAdding = false;
    if (!this.tags.map(item => item.name).includes(tag)) {
      this.tags.push({
        name: tag,
        level: 1
      });
    }
    this.funcChangeControlValue(this.tags);
  }

  removeTag(item: SkillLevelItem) {
    this.tags = this.tags.filter(o => o !== item);
    this.funcChangeControlValue(this.tags);
  }

  registerOnChange(fn: any): void {
    this.funcChangeControlValue = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    // this.tags = obj || [];
  }

  onSelect(e: OptionItem | OptionItem[]) {
    this.addTag((<OptionItem>e).name);
  }

  onChangeLevel(item: SkillLevelItem, e: MatSliderChange) {
    item.level = Number(e.value);
  }
}
