import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import {MainComponentsModule} from "./../../components/components.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {CommonComponentsModule} from "./../../../../components/common-components.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { UserInfoComponent } from './user-info/user-info.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatIconModule} from "@angular/material/icon";
import {ImageCropperModule} from "./../../../../image-cropper/image-cropper.module";
import {WorkExperienceComponent} from "./work-experience/work-experience.component";
import {WorkExperienceItemComponent} from "./work-experience-item/work-experience-item.component";
import {CertificateComponent} from "./certificate/certificate.component";
import {CertificateItemComponent} from "./certificate-item/certificate-item.component";
import {EducationComponent} from "./education/education.component";
import {EducationItemComponent} from "./education-item/education-item.component";
import {ProfileCompanyComponent} from "./profile-company/profile-company.component";
import {CompanyInfoComponent} from "./company-info/company-info.component";



@NgModule({
  declarations: [
    ProfileUserComponent,
    WorkExperienceComponent,
    WorkExperienceItemComponent,
    UserInfoComponent,
    CertificateComponent,
    CertificateItemComponent,
    EducationComponent,
    EducationItemComponent,
    ProfileCompanyComponent,
    CompanyInfoComponent
  ],
    imports: [
        CommonModule,
        MainComponentsModule,
        MatExpansionModule,
        CommonComponentsModule,
        MatDialogModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxSliderModule,
        MatIconModule,
      ImageCropperModule,
    ],
  exports: [
    ProfileUserComponent,
    ProfileCompanyComponent
  ]
})
export class ProfileComponentsModule { }
