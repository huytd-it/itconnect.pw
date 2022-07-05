import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagMgmtRoutingModule } from './tag-mgmt-routing.module';
import { TagMgmtComponent } from './tag-mgmt.component';
import { SchoolComponent } from './school/school.component';
import { TagRootComponent } from './tag-root/tag-root.component';
import { TagFormModalComponent } from './tag-form-modal/tag-form-modal.component';
import { SkillComponent } from './skill/skill.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    TagMgmtComponent,
    SchoolComponent,
    TagRootComponent,
    TagFormModalComponent,
    SkillComponent
  ],
  imports: [
    CommonModule,
    TagMgmtRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    CommonComponentsModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class TagMgmtModule { }
