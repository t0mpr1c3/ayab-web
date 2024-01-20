import { 
  Directive, 
  EventEmitter, 
  HostListener, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output, 
  numberAttribute 
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// https://coryrylan.com/blog/creating-a-custom-debounce-click-directive-in-angular
@Directive({
  selector: '[debounce]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input({ transform: numberAttribute }) debounceTime = 500;

  @Output() debouncedClick = new EventEmitter();

  private clicks = new Subject();
  private subscription!: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe( debounceTime(this.debounceTime))
      .subscribe( event => {
        this.debouncedClick.emit(event)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}