import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CancelService } from '../../../core/services/cancel.service';
import { Validation } from '../../../../../../shared/src/models/validation.model';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';
import { AuthFacade } from '../../facade/auth.facade';

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
  providers: [AuthFacade],
})
export class LoginFormComponent extends Validation implements OnInit {
  public form: FormGroup;
  private _debounce = false;
  public pending$ = this._facade.loginPending$;
  public error$ = this._facade.loginError$;

  constructor(
    private _formBuilder: FormBuilder,
    private _cancelService: CancelService,
    private _facade: AuthFacade,
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
      
    // Submit credentials
    this._facade.loginSubmit({
      username: this.f.username?.value, 
      password: this.f.password?.value,
    });

    // Close dialog
    this._cancelService.emit();
  }  

  public onCancel(): void {
    this._debounce = true;
    this._cancelService.emit();
  }
}
