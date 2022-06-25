import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {take} from "rxjs";
import {PermissionService} from "../../../services/permission.service";
import {AppPermission} from "../../../models/permission.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.redirect());
  }

  redirect() {
    this.authService.data$
      .pipe(take(this.authService.data ? 1 : 2))
      .subscribe(async (data) => {
        if (!data) {
          return;
        }

        // redirect to job search
        if (this.permissionService.hasPermission(AppPermission.JOB_SEARCH)) {
          await this.router.navigate(['job'], { relativeTo: this.route });
          return;
        }
      });
  }
}
