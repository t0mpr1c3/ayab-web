import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericButtonComponent } from '../../../generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: 'about-dialog',
  templateUrl: 'about-dialog.component.html',
  styleUrls: ['about-dialog.component.css'],
  imports: [GenericButtonComponent],
})
export class AboutDialogComponent {  
  constructor(
    private _dialogRef: MatDialogRef<AboutDialogComponent>,
  ) {}

  public close(): void {
    this._dialogRef.close();
  }
}