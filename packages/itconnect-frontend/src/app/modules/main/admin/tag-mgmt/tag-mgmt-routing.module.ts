import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagMgmtComponent } from './tag-mgmt.component';
import {SchoolComponent} from "./school/school.component";
import {SkillComponent} from "./skill/skill.component";

const routes: Routes = [
  { path: 'school', component: SchoolComponent },
  { path: 'skill', component: SkillComponent },
  { path: '**', redirectTo: '../' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagMgmtRoutingModule { }
