import {Component, Input, OnInit} from '@angular/core';
import {User, UserInfo} from "../../../../models/user.model";
import {PeopleService} from "../../../../services/people.service";
import {AppRole} from "../../../../models/permission.model";
import {Job} from "../../../../models/job.model";

@Component({
  selector: 'app-people-item-mini',
  templateUrl: './people-item-mini.component.html',
  styleUrls: ['./people-item-mini.component.scss']
})
export class PeopleItemMiniComponent implements OnInit {
  @Input() user: User;
  @Input() link: string;
  @Input() job: Job;

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
