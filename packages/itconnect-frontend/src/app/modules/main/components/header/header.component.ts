import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "../../../../models/common";
import {PermissionService} from "../../../../services/permission.service";
import {AppPermission} from "../../../../models/permission.model";
import {AppService} from "../../../../services/app.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('menuEl') menuEl: ElementRef;
  menu: MenuItem[];
  isFullLogo: boolean;
  isDropdownMoreMenu: boolean;
  hasMoreMenu: boolean;
  isLoading: boolean;
  subscriptionLoading: Subscription;

  constructor(
    public permission: PermissionService,
    public app: AppService
  ) {
    this.subscriptionLoading = this.app.headLoading$.subscribe((val) => {
      this.isLoading = val;
    })
  }

  ngOnInit(): void {
    this.menu = this.getMenu();
  }

  ngOnDestroy(): void {
    this.subscriptionLoading.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize();
    })
  }

  private getMenu(): MenuItem[] {
    return [
      {
        name: "Trang chủ",
        class: 'icon-home',
        link: 'home',
        permission: AppPermission.POST_FEED
      },
      {
        name: "Bạn bè",
        class: 'icon-friend',
        link: 'friends',
        permission: AppPermission.FRIEND
      },
      {
        name: "Thông báo",
        class: 'icon-notify',
        link: 'notifications',
        permission: AppPermission.NOTIFICATION
      },
      {
        name: "Tin nhắn",
        class: 'icon-message',
        link: 'messages',
        permission: AppPermission.MESSAGE
      }
    ]
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    /**
     * Update logo
     *
     */
    let widthWindow = event ? event.target.innerWidth : window.document.body.clientWidth;
    this.isFullLogo = widthWindow > 500;

    /**
     * Update menu-item
     *
     */
    const scrollWidth = this.menuEl.nativeElement.scrollWidth;
    const clientWidth = this.menuEl.nativeElement.clientWidth;
    const widthItem = 60; // 60px width of menu item
    const sizeMenu = Math.round(clientWidth / widthItem) - 2;
    let hasMoreMenu = false;

    this.menu.forEach((item, index) => {
      // remove 1 because 'index'
      let hidden = index > sizeMenu - 1;
      if (hidden) {
        hasMoreMenu = true;
      }
      item.visible = hidden;
    });

    this.hasMoreMenu = hasMoreMenu;
    if (!hasMoreMenu) {
      // close when hasn't menu dropdown
      this.isDropdownMoreMenu = false;
    }
  }
}
