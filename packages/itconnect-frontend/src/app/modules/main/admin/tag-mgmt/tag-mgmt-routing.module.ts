import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagMgmtComponent } from './tag-mgmt.component';
import {SchoolComponent} from "./school/school.component";
import {SkillComponent} from "./skill/skill.component";
import {PositionComponent} from "./position/position.component";
import {CertificateComponent} from "./certificate/certificate.component";
import {WorkFromComponent} from "./work-from/work-from.component";
import {JobLevelComponent} from "./job-level/job-level.component";
import {JobTypeComponent} from "./job-type/job-type.component";

const routes: Routes = [
  { path: 'school', component: SchoolComponent },
  { path: 'certificate', component: CertificateComponent },
  { path: 'skill', component: SkillComponent },
  { path: 'position', component: PositionComponent },
  { path: 'work-from', component: WorkFromComponent },
  { path: 'job-level', component: JobLevelComponent },
  { path: 'job-type', component: JobTypeComponent },
  { path: '**', redirectTo: '../' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagMgmtRoutingModule { }
