import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {
  CreateTaggedOutput,
  OptionItem,
  PageInput,
  SearchPageOutput,
  TaggedInput,
} from "../../../../models/common";
import {finalize, Observable} from "rxjs";
import {MatSliderChange} from "@angular/material/slider";
import {Options} from "@angular-slider/ngx-slider";
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'app-input-skill',
  templateUrl: './input-skill.component.html',
  styleUrls: ['./input-skill.component.scss'],
  providers: []
})
export class InputSkillComponent implements OnInit {
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;
  @Input() createTagFn: (data: CreateTaggedOutput) => Observable<TaggedInput>;
  @Input() bindLabel: string = 'name';
  @Input() bindLevel: string = 'level';
  @Input() appendTo: string;
  @Input() hasAddTag: boolean = true;
  @Input() items: any[] = [];
  @Input() readOnly: boolean = false;
  @Output() onAdd = new EventEmitter<TaggedInput>();
  @Output() onRemove = new EventEmitter();
  isAdding: boolean;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  async addTag(tag: string) {
    this.isAdding = false;
    this.appService.setHeadLoading(true);
    this.createTagFn({ name: tag })
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.addUserTagged(data);
      })
  }

  removeTag(item: any) {
    this.onRemove.emit(item);
  }

  onSelect(e: OptionItem | OptionItem[]) {
    this.isAdding = false;
    this.addUserTagged(<any>e);
  }

  private addUserTagged(tag: TaggedInput) {
    this.onAdd.emit(tag);
  }
}
