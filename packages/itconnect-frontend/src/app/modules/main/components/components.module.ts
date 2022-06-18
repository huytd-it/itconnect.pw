import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {CommonComponentsModule} from "../../../components/common-components.module";
import { SearchComponent } from './search/search.component';
import {RouterModule} from "@angular/router";
import { ArtdecoComponent } from './artdeco/artdeco.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { InputAddressComponent } from './input-address/input-address.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import { AddLifeTimelineComponent } from './add-life-timeline/add-life-timeline.component';
import { AddLifeTimelineModalComponent } from './add-life-timeline-modal/add-life-timeline-modal.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ArtdecoComponent,
    InputAddressComponent,
    AddLifeTimelineComponent,
    AddLifeTimelineModalComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    RouterModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    InputAddressComponent,
  ]
})
export class MainComponentsModule { }
