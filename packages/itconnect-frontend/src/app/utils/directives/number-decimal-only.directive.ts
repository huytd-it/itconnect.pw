import { Directive, ElementRef, Input, HostListener } from '@angular/core';

/**
 * https://stackoverflow.com/questions/41465542/angular2-input-field-to-accept-only-numbers
 *
 */
@Directive({
  selector: '[appNumberDecimalOnly]'
})
export class NumberDecimalOnlyDirective {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]{0,2})?$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) { }

  @Input() maxlength: number;
  @Input() min: number;
  @Input() max: number;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    const current: string = this.el.nativeElement.value;

    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex) || (this.maxlength && next.length > this.maxlength) ||
      (this.min && +next < this.min) ||
      (this.max && +next >= this.max)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    // Don't allow pasted text that contains non-numerics
    const pastedText = (event.originalEvent || event).clipboardData.getData('text/plain');

    if (pastedText) {
      const regEx = new RegExp('^[0-9]*$');
      if (!regEx.test(pastedText) || (this.maxlength && pastedText.length > this.maxlength) ||
        (this.min && +pastedText < this.min) ||
        (this.max && +pastedText >= this.max)) {
        event.preventDefault();
      }
    }
  }

}
