import { Component, OnInit } from '@angular/core';
import {MenuItem} from "../../../../models/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.menu = this.getMenu();
  }

  private getMenu(): MenuItem[] {
    return [
      {
        name: "Home",
        class: 'icon-home',
        link: '/main'
      },
      {
        name: "Friend",
        class: 'icon-friend',
        link: '/friend'
      },
      {
        name: "Notifications",
        class: 'icon-notify',
        link: '/notifications'
      },
      {
        name: "Message",
        class: 'icon-message',
        link: '/message'
      }
    ]
  }
}
