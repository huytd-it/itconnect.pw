import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-easy-select',
  templateUrl: './easy-select.component.html',
  styleUrls: ['./easy-select.component.scss']
})
export class EasySelectComponent implements OnInit {
  @Input() label: string;
  @Input() multiple: boolean

  selectedCity: any;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];


  constructor() { }

  ngOnInit(): void {
  }

  CreateNew(city: any){
    alert("Create New Clicked : "+city)
  }

}
