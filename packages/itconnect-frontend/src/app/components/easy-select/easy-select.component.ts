import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {OptionItem, PageOutput, SearchPageOutput} from "../../models/common";
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from "lodash";
import {PageInput} from '../../models/common';
import {finalize, Observable} from "rxjs";
import {toNonAccentVietnamese} from "../../utils/common";

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
export class EasySelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() multiple: boolean
  @Input() required: boolean;
  @Input() fDisabled: boolean;
  @Input() loadMoreFn: (query: SearchPageOutput) => Observable<PageInput<any>>;

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

  registerOnChange(fn: any): void {
    this.onNgModelItemChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: OptionItem | OptionItem[]): void {
    this.itemSelected = obj;
  }

  onChange(data: OptionItem | OptionItem[]) {
    this.itemSelected = data;
    this.onNgModelItemChange?.(data);
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

  fetchMore() {
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

  resetLoad() {
    this.searchText = '';
    this.pageData = undefined;
    this.fetchMore();
  }
}
