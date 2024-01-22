import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * @title Directive to update mirror icon attributes
 */
@Directive({
  selector: '#mirrorIcon',
}) 
export class MirrorIconDirective {
  @Input() set knitSide(val: boolean) {
    this._renderer.setAttribute(
      this._element.nativeElement,
      'src',
      val ?
        '../../../../assets/img/garamond-lowercase-e.png' :
        '../../../../assets/img/garamond-lowercase-e-reversed.png'
    );
  }
  @Input() set disabled(val: boolean) {
    this._renderer.setStyle(
      this._element.nativeElement,
      'opacity',
      val ? '.38' : '.87'
    );
  }

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
  ) {}
}