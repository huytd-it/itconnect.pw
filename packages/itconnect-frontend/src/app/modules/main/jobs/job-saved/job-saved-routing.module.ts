import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSavedComponent } from './job-saved.component';

const routes: Routes = [{ path: '', component: JobSavedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSavedRoutingModule { }