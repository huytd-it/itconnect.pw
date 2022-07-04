import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFeedComponent } from './post-feed/post-feed.component';
import {CommonComponentsModule} from "../../../../components/common-components.module";
import { ProfileComponent } from './profile/profile.component';
import { JobTrendingComponent } from './job-trending/job-trending.component';
import {MainComponentsModule} from "../../components/components.module";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import { PositionTrendingComponent } from './position-trending/position-trending.component';
import { SkillTrendingComponent } from './skill-trending/skill-trending.component';



@NgModule({
    declarations: [
        PostFeedComponent,
        ProfileComponent,
        JobTrendingComponent,
        PositionTrendingComponent,
        SkillTrendingComponent
    ],
  exports: [
    PostFeedComponent,
    ProfileComponent,
    JobTrendingComponent,
    SkillTrendingComponent,
    PositionTrendingComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MainComponentsModule,
    RouterModule,
    MatIconModule
  ]
})
export class HomeComponentsModule { }
