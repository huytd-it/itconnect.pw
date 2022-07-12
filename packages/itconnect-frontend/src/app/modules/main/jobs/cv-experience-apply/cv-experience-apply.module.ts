import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvExperienceApplyRoutingModule } from './cv-experience-apply-routing.module';
import { CvExperienceApplyComponent } from './cv-experience-apply.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MainComponentsModule} from "../../components/components.module";
import {UtilsModule} from "../../../../utils/utils.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { CvExperienceApplyModalComponent } from './cv-experience-apply-modal/cv-experience-apply-modal.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    CvExperienceApplyComponent,
    CvExperienceApplyModalComponent
  ],
  imports: [
    CommonModule,
    CvExperienceApplyRoutingModule,
    MatPaginatorModule,
    MainComponentsModule,
    UtilsModule,
    NgSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class CvExperienceApplyModule { }
