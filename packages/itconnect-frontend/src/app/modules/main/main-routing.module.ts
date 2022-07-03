import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import {PermissionGuard} from "../../utils/guards/permission.guard";
import {AppPermission} from "../../models/permission.model";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.POST_FEED
        }
      },
      {
        path: 'complete-profile',
        loadChildren: () => import('./complete-profile/complete-profile.module').then(m => m.CompleteProfileModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.COMPLETE_PROFILE
        }
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.MESSAGE
        }
      },
      {
        path: 'friends',
        loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.FRIEND
        }
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.NOTIFICATION
        }
      },
      {
        path: 'me',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.PROFILE
        }
      },
      {
        path: 'jobs',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.JOB
        }
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [PermissionGuard],
        data: {
          permission: AppPermission.ADMIN
        }
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
