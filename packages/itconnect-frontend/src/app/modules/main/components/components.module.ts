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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputSkillComponent } from './input-skill/input-skill.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {InputSkillLevelComponent} from "./input-skill-level/input-skill-level.component";
import {MatSliderModule} from "@angular/material/slider";
import { GroupControlTimeTextComponent } from './group-control-time-text/group-control-time-text.component';
import { GroupControlTimeTextModalComponent } from './group-control-time-text-modal/group-control-time-text-modal.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {InputSkillLevelRangeComponent} from "./input-skill-level-range/input-skill-level-range.component";
import { AddCompanyComponent } from './add-company/add-company.component';
import { JobSuggestMiniComponent } from './job-suggest-mini/job-suggest-mini.component';
import { JobItemComponent } from './job-item/job-item.component';
import {JobItemMinComponent} from "./job-item-min/job-item-min.component";

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ArtdecoComponent,
    InputAddressComponent,
    InputSkillComponent,
    InputSkillLevelComponent,
    GroupControlTimeTextComponent,
    GroupControlTimeTextModalComponent,
    InputSkillLevelRangeComponent,
    AddCompanyComponent,
    JobSuggestMiniComponent,
    JobItemComponent,
    JobItemMinComponent
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
    MatProgressBarModule,
    MatSliderModule,
    NgxSliderModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    InputAddressComponent,
    InputSkillComponent,
    InputSkillLevelComponent,
    InputSkillLevelRangeComponent,
    AddCompanyComponent,
    JobSuggestMiniComponent,
    JobItemComponent,
    JobItemMinComponent
  ]
})
export class MainComponentsModule { }
