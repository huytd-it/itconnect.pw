import { Component, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-artdeco',
  templateUrl: './artdeco.component.html',
  styleUrls: ['./artdeco.component.scss']
})
export class ArtdecoComponent implements OnInit {
  faCaretDown = faCaretDown;
  isOpenDropdown: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
