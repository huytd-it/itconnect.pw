import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from "@angular/material/input";
import { LogoComponent } from './logo/logo.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    LogoComponent,
  ]
})
export class ComponentsModule { }
