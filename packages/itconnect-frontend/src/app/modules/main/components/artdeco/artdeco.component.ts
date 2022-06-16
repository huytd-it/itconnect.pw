import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artdeco',
  templateUrl: './artdeco.component.html',
  styleUrls: ['./artdeco.component.scss']
})
export class ArtdecoComponent implements OnInit {
  faCaretDown = faCaretDown;
  isOpenDropdown: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {});
  }
}
