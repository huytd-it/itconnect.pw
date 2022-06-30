import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeedComponent } from './post-feed/post-feed.component';
import {CommonComponentsModule} from "../../../../components/common-components.module";
import { ProfileComponent } from './profile/profile.component';



@NgModule({
    declarations: [
        PostFeedComponent,
        ProfileComponent
    ],
  exports: [
    PostFeedComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule
  ]
})
export class HomeComponentsModule { }
