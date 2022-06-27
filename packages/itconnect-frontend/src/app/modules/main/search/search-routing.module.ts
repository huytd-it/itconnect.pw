import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import {PermissionGuard} from "../../../utils/guards/permission.guard";
import {AppPermission} from "../../../models/permission.model";

const routes: Routes = [
  {
    path: '', component: SearchComponent
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then(m => m.JobModule),
    canActivate: [PermissionGuard],
    data: {
      permission: AppPermission.JOB_SEARCH
    }
  },
  {
    path: 'people',
    loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
    canActivate: [PermissionGuard],
    data: {
      permission: AppPermission.PEOPLE_SEARCH
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
