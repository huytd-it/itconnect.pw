import {Component, Input, OnInit} from '@angular/core';
import {SkillService} from "../../../../../services/skill.service";
import {Skill, SkillSearchInput} from "../../../../../models/skill.model";
import {Approve} from "../../../../../models/common";

@Component({
  selector: 'app-skill-trending',
  templateUrl: './skill-trending.component.html',
  styleUrls: ['./skill-trending.component.scss']
})
export class SkillTrendingComponent implements OnInit {
  @Input() label: string = 'Top kỹ năng tuyển dụng';
  @Input() order: keyof Skill = 'jobActiveSkillCount';
  data: SkillSearchInput;

  get type() {
    return this.order.startsWith('job') ? 'job' : 'people';
  }

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.load());
  }

  load() {
    this.skillService.search({
      order_field: this.order,
      order: 'DESC',
    }).pipe(this.skillService.mapData())
      .subscribe(data => {
        this.data = data;
        if (this.data?.data) {
          this.data.data = this.data.data.filter(item => item[this.order] > 0);
        }
      })
  }
}
