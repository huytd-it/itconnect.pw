import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import {TAG_ROOT_SERVICE_TOKEN} from "../tag-root/tag-root.component";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  providers: [
    {
      provide: TAG_ROOT_SERVICE_TOKEN,
      useExisting: SkillService
    }
  ]
})
export class SkillComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
