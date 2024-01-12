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
export class GenericButton {
  @Input({ required: true }) name: string;
  @Input() formControlName: string;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  
  public onClick(): void {
    this.clicked.emit();
  }
}