import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvExperienceApplyComponent } from './cv-experience-apply.component';

const routes: Routes = [{ path: '', component: CvExperienceApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvExperienceApplyRoutingModule { }
