import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromLogin from '../../actions/login.actions';

import { SubmitService } from '../../../core/services/submit.service';
import { CancelService } from '../../../core/services/cancel.service';
import { Validation } from '../../../../../../shared/src/models/validation.model';
import { LoginCredentials } from '../../../../../../shared/src/models/credentials.model';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: 'login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    GenericButtonComponent,
  ],
})
export class LoginFormComponent extends Validation implements OnInit {
  public pending$ = this._store.select(fromRoot.selectLoginPending);
  public error$ = this._store.select(fromRoot.selectLoginError);

  public form: FormGroup;
  private _debounce = false;

  constructor(
    private _store: Store<fromRoot.State>,
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
    if (this.form.invalid || this._debounce) {
      return;
    }
    this._debounce = true;
      
    // Return credentials
    this._submitService.emit({
      action: fromLogin.loginSubmit,
      payload: {
        credentials: {
          username: this.f.username?.value, 
          password: this.f.password?.value,
        } as LoginCredentials
      }
    });

    // Close dialog
    this._cancelService.emit();
  }  

  public onCancel(): void {
    this._debounce = true;
    this._cancelService.emit();
  }
}
