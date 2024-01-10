import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'generic-button',
  templateUrl: 'generic-button.html',
  styleUrls: ['generic-button.css'],
  imports: [
    MatButtonModule,
  ],
})
export class GenericButton {
  @Input({ required: true }) name: string;
  @Input() formControlName: string;
  @Input() disabled: boolean = false;
  
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  
  public onClick(): void {
    this.clicked.emit();
  }
}