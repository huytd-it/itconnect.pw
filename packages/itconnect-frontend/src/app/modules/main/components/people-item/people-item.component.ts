import {Component, Input, OnInit} from '@angular/core';
import {User, UserInfo} from "../../../../models/user.model";
import {PeopleService} from "../../../../services/people.service";
import {AppRole} from "../../../../models/permission.model";

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss']
})
export class PeopleItemComponent implements OnInit {
  @Input() user: User;
  @Input() link: string;
  @Input() applyTime: Date;

  get _link() {
    if (this.link) return this.link;
    return '/u/contact/' + this.user.id;
  };

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
  }

  getYoe(item: UserInfo) {
    return this.peopleService.getYoe(item);
  }
}
