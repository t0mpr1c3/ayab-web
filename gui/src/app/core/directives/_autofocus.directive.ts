import { Directive, AfterContentInit, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {
  public constructor(private element: ElementRef) {}

  public ngAfterContentInit(): void {
    const nativeElement: HTMLElement = this.element.nativeElement as HTMLElement;
    if (nativeElement.autofocus) {
      console.log('focus on:');
      console.log(nativeElement);
      nativeElement.focus();
    } else {
      if (nativeElement.hasChildNodes()) {
        const children: HTMLCollection = nativeElement.children;
        for (let i = 0; i < children.length; i++) {
          let child: HTMLElement = children[i]! as HTMLElement;
          if (child.hasAttribute('autofocus')) {
            console.log('focus on:');
            console.log(child);
            child.focus();
          }
        }
      }
    }
  }
}