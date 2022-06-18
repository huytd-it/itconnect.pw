import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import {PermissionGuard} from "../../../utils/guards/permission.guard";
import {AppPermission} from "../../../models/permission.model";

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.POST_FEED
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
