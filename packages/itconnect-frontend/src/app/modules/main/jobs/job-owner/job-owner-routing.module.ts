import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOwnerComponent } from './job-owner.component';

const routes: Routes = [{ path: '', component: JobOwnerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOwnerRoutingModule { }
