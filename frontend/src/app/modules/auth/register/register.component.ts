import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hidePwd: boolean | undefined;
  hideRePwd: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
