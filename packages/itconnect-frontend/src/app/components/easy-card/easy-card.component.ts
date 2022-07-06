import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-easy-card',
  templateUrl: './easy-card.component.html',
  styleUrls: ['./easy-card.component.scss']
})
export class EasyCardComponent implements OnInit {
  @Input() label: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
