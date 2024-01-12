import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Credentials } from '../models/credentials.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'bc-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css'],
  imports: [CommonModule, MatFormFieldModule],
})
export class LoginFormComponent {
  @Input() set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage!: string | null;

  @Output() submitted = new EventEmitter<Credentials>();

  public form: FormGroup = new FormGroup({
    username: new FormControl('ngrx'),
    password: new FormControl(''),
  });

  public submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}