import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  booleanAttribute 
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'generic-button',
  templateUrl: 'generic-button.component.html',
  styleUrls: ['generic-button.component.css'],
  imports: [
    MatButtonModule,
  ],
})
export class GenericButtonComponent {
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() formControlName: string;
  @Input({ required: true }) name: string;
  
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  
  public onClick(): void {
    this.clicked.emit();
  }
}