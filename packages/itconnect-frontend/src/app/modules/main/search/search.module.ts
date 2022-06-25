import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {SearchComponentModule} from "./components/search-component.module";


@NgModule({
  declarations: [
    SearchComponent
  ],
    imports: [
        CommonModule,
        SearchRoutingModule,
    ]
})
export class SearchModule { }
