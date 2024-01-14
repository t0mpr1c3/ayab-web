import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import * as root from '../../../../../reducers';
import * as auth from '../../../../services/auth/reducers/auth.reducer';

import { SubmitService } from '../../../../services/submit.service';
import { CancelService } from '../../../../services/cancel.service';
import { Validation } from '../../../../models/validation.model';
import { GenericButtonComponent } from '../../../generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: 'login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    GenericButtonComponent,
  ],
})
export class LoginFormComponent extends Validation implements OnInit {
  pending$ = this._store.select(auth.selectLoginPending);
  error$ = this._store.select(auth.selectLoginError);

  public form: FormGroup;
  private _canceled = false;

  constructor(
    private _store: Store<root.State>,
    private _formBuilder: FormBuilder,
    private _submitService: SubmitService,
    private _cancelService: CancelService,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(this.userNameMinLength), 
        Validators.maxLength(this.userNameMaxLength), 
        Validators.pattern("^[0-9a-zA-Z_]*$")
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
    });
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }

  public onSubmit(): void {
    if (this.form.invalid || this._canceled) {
      return;
    }
      
    // Return credentials
    this._submitService.emit({
      form: LoginFormComponent,
      credentials: {
        username: this.f.username?.value, 
        password: this.f.password?.value,
      }
    });
  }  

  public onCancel(): void {
    this._canceled = true;
    this._cancelService.emit();
  }
}
