import {Inject, Injectable, InjectionToken} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";

export const CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN = 'CUSTOM_MAT_PAGINATOR_TOKEN';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(
    @Inject(CUSTOM_MAT_PAGINATOR_PER_PAGE_TOKEN) private itemsPerPageLabelT: string
  ) {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.itemsPerPageLabel = this.itemsPerPageLabelT;
    this.nextPageLabel = "Trang kế";
    this.previousPageLabel = "Quay lại";
    this.changes.next();
  }

  // @ts-ignore
  getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
