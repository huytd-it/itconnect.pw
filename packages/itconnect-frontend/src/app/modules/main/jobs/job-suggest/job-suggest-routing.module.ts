import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSuggestComponent } from './job-suggest.component';

const routes: Routes = [{ path: '', component: JobSuggestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSuggestRoutingModule { }
