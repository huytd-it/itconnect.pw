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
          permission: AppPermission.JOB_CE
        }
      },
      {
        path: 'view',
        loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB
        }
      },
      {
        path: 'apply',
        loadChildren: () => import('./job-apply/job-apply.module').then(m => m.JobApplyModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB_APPLY
        }
      },
      {
        path: 'saved',
        loadChildren: () => import('./job-saved/job-saved.module').then(m => m.JobSavedModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB_SAVED
        }
      },
      {
        path: 'owner',
        loadChildren: () => import('./job-owner/job-owner.module').then(m => m.JobOwnerModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB_CE
        }
      },
      {
        path: 'manage',
        loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB_CE
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
