import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

/**
 * @title Custom snackbar component
 */
@Component({
  selector: 'custom-snackbar',
  template: `
    <div class="bar snack-container">
      <span>{{ data.message }}</span>
      <mat-icon>{{ data.icon }}</mat-icon>
    </div>
  `,
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data); 
  }

  /*
  get getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
      default:
        return '';
    }
  }
  */
}
