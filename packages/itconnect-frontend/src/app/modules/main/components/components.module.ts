import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {ComponentsModule} from "../../../components/components.module";
import { SearchComponent } from './search/search.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ]
})
export class MainComponentsModule { }
