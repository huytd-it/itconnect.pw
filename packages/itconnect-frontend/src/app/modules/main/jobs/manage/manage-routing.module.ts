import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: ':id',
    component: ManageComponent,
    children: [
      {
        path: 'apply',
        loadChildren: () => import('./apply/apply.module').then(m => m.ApplyModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
