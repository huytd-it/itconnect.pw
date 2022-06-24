import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef, HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {OptionItem, PageOutput, SearchPageOutput} from "../../models/common";
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from "lodash";
import {PageInput} from '../../models/common';
import {finalize, Observable} from "rxjs";
import {toNonAccentVietnamese} from "../../utils/common";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-easy-select',
  templateUrl: './easy-select.component.html',
  styleUrls: ['./easy-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EasySelectComponent),
      multi: true
    }
  ]
})
export class EasySelectComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit {
  @ViewChild('ngSelect') ngSelect: NgSelectComponent;
  @Input() label: string;
  @Input() multiple: boolean
  @Input() required: boolean;
  @Input() fDisabled: boolean;
  @Input() autoFocus: boolean;
  @Input() isAddTag: boolean = true;
  @Input() addTagText: string = "Thêm mới"
  @Input() appendTo: string;
  @Input() dropdownPosition: 'top' | 'right' | 'bottom' | 'left' | 'auto' = 'auto';
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;
  @Output() addTag = new EventEmitter<string>();
  @Output() onBlur = new EventEmitter();
  @Output() onChangeE = new EventEmitter<OptionItem | OptionItem[]>();

  itemSelected: OptionItem | OptionItem[];

  isLoading: boolean;
  searchText: string;
  pageData: PageInput<any> | undefined;

  private onNgModelItemChange: (data: OptionItem | OptionItem[]) => void;

  get items() {
    return this.pageData?.data || [];
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { autoFocus } = changes;
    if (autoFocus && autoFocus.currentValue &&  autoFocus.previousValue != autoFocus.currentValue) {
      setTimeout(() => this.focusInput());
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ngSelect.element.getElementsByTagName('input')[0].onblur = () => {
        this.onBlur.emit();
      }
    })
  }


  close() {
    this.ngSelect.close();
  }

  registerOnChange(fn: any): void {
    this.onNgModelItemChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: OptionItem | OptionItem[]): void {
    this.itemSelected = obj;
  }

  funcAddTag = () => {
    if (!this.addTag) {
      return false;
    }
    return (tag: string) => {
      this.addTag.emit(tag);
    }
  }

  onChange(data: OptionItem | OptionItem[]) {
    this.itemSelected = data;
    this.onNgModelItemChange?.(data);
    this.onChangeE.emit(data);
  }

  onSearchFn(term: string, item: OptionItem) {
    term = toNonAccentVietnamese(term.toLowerCase());
    const textMatch = toNonAccentVietnamese(item.name.toLowerCase());
    return textMatch.indexOf(term) > -1;
  }

  onSearch(e: {term: string; items: OptionItem[]}) {
    this.isLoading = true;
    this.onSearchDebounce(e);
  }

  private onSearchDebounce = _.debounce((e: {term: string; items: OptionItem[]}) => {
    this.searchText = e.term;
    this.pageData = undefined;
    this.fetchMore();
  }, 500);

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll(e: { start: number; end: number }) {

  }

  private fetchMore() {
    const query: SearchPageOutput = {
      page: 1,
      take: 10,
    };

    if (this.searchText) {
      query.search = this.searchText;
    }

    let hasNext = true;
    if (this.pageData) {
      const {meta} = this.pageData;
      if (meta.hasNextPage) {
        query.page = meta.page + 1;
        query.take = meta.take;
      } else {
        hasNext = false;
      }
    }

    if (hasNext) {
      this.isLoading = true;
      this.loadMoreFn(query)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(dataMore => {
          if (this.pageData) {
            this.pageData.meta = dataMore.meta;
            this.pageData.data = this.pageData.data.concat(dataMore.data);
          } else {
            this.pageData = dataMore;
          }
        })
    }
  }

  onOpen() {
    this.resetLoad();
  }

  onClose() {
    if (this.searchText) {
      this.resetLoad();
    }
  }

  onClear() {
    this.resetLoad();
  }

  private resetLoad() {
    this.searchText = '';
    this.pageData = undefined;
    this.fetchMore();
  }

  private focusInput() {
    this.ngSelect.focus();
    this.ngSelect.open();
  }
}
