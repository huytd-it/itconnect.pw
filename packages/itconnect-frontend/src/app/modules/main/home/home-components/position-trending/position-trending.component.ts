import {Component, Input, OnInit} from '@angular/core';
import {Skill, SkillSearchInput} from "../../../../../models/skill.model";
import {SkillService} from "../../../../../services/skill.service";
import {Approve} from "../../../../../models/common";
import {Position, PositionSearchInput} from "../../../../../models/position.model";
import {PositionService} from "../../../../../services/position.service";

@Component({
  selector: 'app-position-trending',
  templateUrl: './position-trending.component.html',
  styleUrls: ['./position-trending.component.scss']
})
export class PositionTrendingComponent implements OnInit {
  @Input() label: string = 'Top vị trí tuyển dụng';
  @Input() order: keyof Position = 'jobActivePositionCount';
  data: PositionSearchInput;

  get type() {
    return this.order.startsWith('job') ? 'job' : 'people';
  }

  constructor(
    private positionService: PositionService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load() {
    this.positionService.search({
      order_field: this.order,
      order: 'DESC',
    }).pipe(this.positionService.mapData())
      .subscribe(data => {
        this.data = data;
        if (this.data?.data) {
          this.data.data = this.data.data.filter(item => item[this.order] > 0);
        }
      })
  }
}
