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
import {ReactiveFormsModule} from "@angular/forms";
import { InputSkillComponent } from './input-skill/input-skill.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {InputSkillLevelComponent} from "./input-skill-level/input-skill-level.component";
import {MatSliderModule} from "@angular/material/slider";
import { GroupControlTimeTextComponent } from './group-control-time-text/group-control-time-text.component';
import { GroupControlTimeTextModalComponent } from './group-control-time-text-modal/group-control-time-text-modal.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";

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
    ],
  exports: [
    HeaderComponent,
    SearchComponent,
    InputAddressComponent,
    InputSkillComponent,
    InputSkillLevelComponent,
  ]
})
export class MainComponentsModule { }
