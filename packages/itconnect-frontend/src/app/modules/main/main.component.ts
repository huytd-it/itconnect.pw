import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'main-module');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'main-module');
  }

  ngOnInit(): void {
  }


}
