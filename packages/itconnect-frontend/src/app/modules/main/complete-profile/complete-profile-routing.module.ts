import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile.component';

const routes: Routes = [{ path: '', component: CompleteProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteProfileRoutingModule { }
