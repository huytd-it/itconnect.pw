import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPositionComponent } from './select-position/select-position.component';
import { ProfileStaffComponent } from './profile-staff/profile-staff.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { PreviewComponent } from './preview/preview.component';
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {MainComponentsModule} from "../../components/components.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  declarations: [
    SelectPositionComponent,
    ProfileStaffComponent,
    ProfileCompanyComponent,
    PreviewComponent
  ],
  exports: [
    SelectPositionComponent,
    ProfileStaffComponent,
    ProfileCompanyComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MatRadioModule,
    MatTooltipModule,
    MatInputModule,
    MainComponentsModule,
    MatAutocompleteModule
  ]
})
export class CompleteProfileComponentsModule { }
