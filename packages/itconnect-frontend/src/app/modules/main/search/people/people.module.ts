import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import {SearchComponentModule} from "../components/search-component.module";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {JobSearchComponentsModule} from "./components/job-search-components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../utils/utils.module";
import {MainComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    PeopleComponent
  ],
    imports: [
        CommonModule,
        PeopleRoutingModule,
        SearchComponentModule,
        MatIconModule,
        JobSearchComponentsModule,
        MatButtonModule,
        MatPaginatorModule,
        UtilsModule,
        CommonComponentsModule,
        MainComponentsModule,
    ]
})
export class PeopleModule { }
