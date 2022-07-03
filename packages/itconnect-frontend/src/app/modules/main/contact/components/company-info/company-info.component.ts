import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "./../../../../../services/auth.service";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Input() user: User;

  get companyInfo() {
    return this.user.companyInfo;
  };

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }
}
