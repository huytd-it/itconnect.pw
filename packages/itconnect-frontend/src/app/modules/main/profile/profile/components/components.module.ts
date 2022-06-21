import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import {MainComponentsModule} from "../../../components/components.module";



@NgModule({
  declarations: [
    ProfileUserComponent,
    ProfileCompanyComponent
  ],
  imports: [
    CommonModule,
    MainComponentsModule,
  ],
  exports: [
    ProfileUserComponent,
    ProfileCompanyComponent
  ]
})
export class ProfileComponentsModule { }
