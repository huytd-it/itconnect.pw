import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import {MainComponentsModule} from "../../../components/components.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {CommonComponentsModule} from "../../../../../components/common-components.module";
import {WorkExperienceModalComponent} from "./work-experience-modal/work-experience-modal.component";
import {WorkExperienceComponent} from "./work-experience/work-experience.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { WorkExperienceItemComponent } from './work-experience-item/work-experience-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoModalComponent } from './user-info-modal/user-info-modal.component';



@NgModule({
  declarations: [
    ProfileUserComponent,
    ProfileCompanyComponent,
    WorkExperienceModalComponent,
    WorkExperienceComponent,
    WorkExperienceItemComponent,
    UserInfoComponent,
    UserInfoModalComponent
  ],
    imports: [
        CommonModule,
        MainComponentsModule,
        MatExpansionModule,
        CommonComponentsModule,
        MatDialogModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatDatepickerModule,
      MatNativeDateModule
    ],
  exports: [
    ProfileUserComponent,
    ProfileCompanyComponent
  ]
})
export class ProfileComponentsModule { }
