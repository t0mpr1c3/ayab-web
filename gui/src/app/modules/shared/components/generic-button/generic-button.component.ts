import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  booleanAttribute 
} from '@angular/core';

/**
 * @title Generic button component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'generic-button',
  templateUrl: 'generic-button.component.html',
  styleUrls: ['generic-button.component.css'],
})
export default class GenericButtonComponent {
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ required: true }) name: string;
  
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  
  public onClick(): void {
    this.clicked.emit();
  }
}