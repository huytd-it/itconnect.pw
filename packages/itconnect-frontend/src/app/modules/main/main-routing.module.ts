import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule) },
      { path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule) },
      { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
      { path: 'complete-profile', loadChildren: () => import('./complete-profile/complete-profile.module').then(m => m.CompleteProfileModule) },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
