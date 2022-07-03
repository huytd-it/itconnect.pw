import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanComponent } from './ban.component';

const routes: Routes = [{ path: '', component: BanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanRoutingModule { }
