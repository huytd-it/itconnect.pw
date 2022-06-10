import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { RoomSearchComponent } from './room-search/room-search.component';
import {ComponentsModule} from "../../../../components/components.module";
import { MessageComponent } from './message/message.component';
import { MessageEditorComponent } from './message-editor/message-editor.component';
import {AutosizeModule} from "ngx-autosize";
import {MatSidenavModule} from "@angular/material/sidenav";
import { RoomDetailComponent } from './room-detail/room-detail.component';

@NgModule({
  declarations: [
    RoomComponent,
    RoomSearchComponent,
    MessageComponent,
    MessageEditorComponent,
    RoomDetailComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatTooltipModule,
    AutosizeModule,
    MatSidenavModule
  ],
  exports: [
    RoomComponent,
    MessageComponent
  ]
})
export class MessagesComponentsModule { }
