import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {ComponentsModule} from "../../../components/components.module";
import { SearchComponent } from './search/search.component';
import {RouterModule} from "@angular/router";
import { ArtdecoComponent } from './artdeco/artdeco.component';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ArtdecoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
  ]
})
export class MainComponentsModule { }
