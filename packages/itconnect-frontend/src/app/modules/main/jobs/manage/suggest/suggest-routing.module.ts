import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestComponent } from './suggest.component';

const routes: Routes = [{ path: '', component: SuggestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestRoutingModule { }
