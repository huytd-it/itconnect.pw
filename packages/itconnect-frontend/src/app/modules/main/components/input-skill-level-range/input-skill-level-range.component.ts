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
  selector: 'app-input-skill-level-range',
  templateUrl: './input-skill-level-range.component.html',
  styleUrls: ['./input-skill-level-range.component.scss'],
  providers: []
})
export class InputSkillLevelRangeComponent implements OnInit {
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;
  @Input() createTagFn: (data: CreateTaggedOutput) => Observable<TaggedInput>;
  @Input() bindLabel: string = 'name';
  @Input() bindLevelMin: string = 'levelMin';
  @Input() bindLevelMax: string = 'levelMax';
  @Input() appendTo: string;
  @Input() items: any[] = [];
  @Output() onAdd = new EventEmitter<TaggedInput>();
  @Output() onChange = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter();
  isAdding: boolean;

  options: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    showTicks: true,
    showSelectionBar: true,
    getPointerColor: value => 'var(--primary)',
    getTickColor: value => '#d8e0f3',
    getSelectionBarColor: value => 'var(--primary)',
  };

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


  onChangeLevelMin(item: any, e: number) {
    item[this.bindLevelMin] = e;
    this.onChange.emit(item);
  }

  onChangeLevelMax(item: any, e: number) {
    item[this.bindLevelMax] = e;
    this.onChange.emit(item);
  }
}
