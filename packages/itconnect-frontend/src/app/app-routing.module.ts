import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./utils/guards/auth.guard";
import {GuestGuard} from "./utils/guards/guest.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    ],
    canActivate: [GuestGuard],
  },
  {
    path: 'u',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
  { path: 'maintenance', loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
