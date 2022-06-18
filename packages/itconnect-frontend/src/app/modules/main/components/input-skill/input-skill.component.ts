import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {PageInput, SearchPageOutput} from "../../../../models/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-input-skill',
  templateUrl: './input-skill.component.html',
  styleUrls: ['./input-skill.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSkillComponent),
      multi: true
    }
  ]
})
export class InputSkillComponent implements OnInit, ControlValueAccessor {
  isAdding: boolean;
  tags: string[] = [];
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;

  private funcChangeControlValue: (data: any) => void;

  constructor() { }

  ngOnInit(): void {
  }

  addTag(tag: string) {
    this.isAdding = false;
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.funcChangeControlValue(this.tags);
  }

  removeTag(item: string) {
    this.tags = this.tags.filter(o => o !== item);
    this.funcChangeControlValue(this.tags);
  }

  registerOnChange(fn: any): void {
    this.funcChangeControlValue = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.tags = obj;
  }
}
