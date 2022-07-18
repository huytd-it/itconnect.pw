import {Component, Input, OnInit} from '@angular/core';
import {User, UserInfo} from "../../../../models/user.model";
import {PeopleService} from "../../../../services/people.service";
import {AppRole} from "../../../../models/permission.model";
import {ScriptService} from "../../../../services/script.service";
import {PdfService} from "../../../../services/pdf.service";

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss']
})
export class PeopleItemComponent implements OnInit {
  @Input() user: User;
  @Input() link: string;
  @Input() applyTime: Date;
  @Input() noLink: boolean;

  get _link() {
    if (this.noLink) return null;
    if (this.link) return this.link;
    return '/u/contact/' + this.user.id;
  };

  constructor(
    private peopleService: PeopleService,
    private pdfService: PdfService
  ) {
  }

  ngOnInit(): void {
  }

  getYoe(item: UserInfo) {
    return this.peopleService.getYoe(item);
  }

  printPdf() {
    this.pdfService.generatePdf(this.user);
  }
}
