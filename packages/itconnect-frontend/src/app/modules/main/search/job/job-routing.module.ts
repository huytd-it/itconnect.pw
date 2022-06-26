import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job.component';
import {ViewJobComponent} from "./components/view-job/view-job.component";

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      { path: ':id', component: ViewJobComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
