import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss']
})
export class InputAddressComponent implements OnInit {
  test = ['hello 1', 'hello 2']

  constructor() { }

  ngOnInit(): void {
  }

}
