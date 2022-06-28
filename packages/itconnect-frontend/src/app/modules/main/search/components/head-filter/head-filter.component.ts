import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

export interface IPath {
  name: string;
  path: string;
}

@Component({
  selector: 'app-head-filter',
  templateUrl: './head-filter.component.html',
  styleUrls: ['./head-filter.component.scss']
})
export class HeadFilterComponent implements OnInit {
  typeSelected: IPath | undefined;
  list: IPath[] = [
    {
      name: 'Công việc',
      path: '/u/search/job'
    },
    {
      name: 'Mọi người',
      path: '/u/search/people'
    },
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.typeSelected = this.list.find(item => this.router.url.match(item.path));
    })
  }

  async onChange(e: IPath) {
    this.typeSelected = e;
    await this.router.navigate([e.path]);
  }
}
