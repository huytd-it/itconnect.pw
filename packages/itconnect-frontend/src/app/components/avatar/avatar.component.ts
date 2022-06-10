import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {generateColorByName} from "../../helpers/color";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() src: string;
  @Input() radius: number = 30;

  hasShowImg: boolean;
  prefixName: string;
  color: { outputHSL: string, contrastRGB: string };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { name, src } = changes;
    if (
      (src && src.currentValue != src.previousValue) ||
      (name && name.currentValue != name.previousValue)
    ) {
      setTimeout(() => this.init());
    }
  }

  ngOnInit(): void {
  }

  onImageError() {
    this.init(true);
  }

  private init(focusNoSrc?: boolean) {
    if (this.src && !focusNoSrc) {
      this.hasShowImg = true;
    } else {
      this.hasShowImg = false;
      this.prefixName = this.name.split(' ').pop()?.charAt(0) || "";
      this.prefixName = this.prefixName.toUpperCase();
      this.color = generateColorByName(this.name);
    }
  }
}
