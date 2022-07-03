import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../../services/app.service";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {User, UserSearchInput, UserSearchOutput, UserType} from 'src/app/models/user.model';
import {UserService} from "../../../../services/user.service";
import {AppRole} from 'src/app/models/permission.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  orderField = 'user.createdAt';
  order = 'DESC';
  displayedColumns: string[] = ['user.id', 'avatar', 'userInfo.fullName', 'user.email', 'user.role', 'action'];

  search: string;
  data: UserSearchInput;

  readonly AppRole = AppRole;

  constructor(
    private userService: UserService,
    public appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load(page: number = 1, take: number = 10) {
    const query: UserSearchOutput = {
      search: this.search,
      order_field: this.orderField,
      order: <any>this.order,
      page,
      take,
      type: UserType.User
    }
    this.appService.setHeadLoading(true);
    this.userService.search(query)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data = data;
      })
  }

  onSearch() {
    this.load();
  }

  onChangePage(e: PageEvent) {
    this.load(e.pageIndex + 1, e.pageSize);
  }

  approve(user: User) {
  }

  ban(user: User) {
    this.appService.setHeadLoading(true);
    this.userService.ban(user.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        user.role = AppRole.Ban;
      })
  }

  unban(user: User) {
    this.appService.setHeadLoading(true);
    this.userService.unban(user.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        user.role = AppRole.User;
      })
  }


  remove(user: User) {
    this.appService.setHeadLoading(true);
    this.userService.delete(user.id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.data.data = this.data.data.filter(item => item.id != user.id);
      })
  }

  announceSortChange(e: any) {
    this.orderField = e.active;
    this.order = e.direction.toUpperCase() || 'DESC';
    this.onSearch();
  }

  clickRow(r: User) {
    this.router.navigate(['/u/contact', r.id]).then(() => {})
  }
}
