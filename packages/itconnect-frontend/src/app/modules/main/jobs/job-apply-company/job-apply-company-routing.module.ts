import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplyCompanyComponent } from './job-apply-company.component';

const routes: Routes = [{ path: '', component: JobApplyCompanyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobApplyCompanyRoutingModule { }
