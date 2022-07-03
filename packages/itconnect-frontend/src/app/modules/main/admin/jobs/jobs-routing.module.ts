import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import {ViewComponent} from "../../jobs/view/view.component";

const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'view/:id', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
