import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AppService} from "../../../services/app.service";
import {User} from "../../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import { AppRole } from 'src/app/models/permission.model';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  user: User;
  AppRole = AppRole;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.load(data['id']);
    })
  }

  load(id: number) {
    if (this.authService.data?.user.id == id) {
      this.router.navigate(['/u/me']).then(() => {})
      return;
    }
    this.appService.setHeadLoading(true);
    this.userService.get(id)
      .pipe(finalize(() => this.appService.setHeadLoading(false)))
      .subscribe(data => {
        this.user = data;
      })
  }

}
