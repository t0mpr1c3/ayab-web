import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { setToken } from '../../../../services/auth/helpers/auth';
import { MustMatch } from '../../../../helpers/must-match'; // custom validator
import { Validation } from '../../../../models/validation.model';
import { UserApiService } from '../../../../services/user-api.service';
import { SubmitService } from '../../../../services/submit.service';
import { CancelService } from '../../../../services/cancel.service';
import { DebounceClickDirective } from '../../../../directives/debounce.directive';
import { GenericButtonComponent } from '../../../generic-button/generic-button.component';
import { RegistrationConfirmationDialog } from './registration-confirmation/registration-confirmation.component';
import { RegistrationCredentials } from '../../../../../../../../shared/src/models/credentials.model';

@Component({
  standalone: true,
  selector: 'registration-form',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.css'],
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    CommonModule, 
    ReactiveFormsModule, 
    MatIconModule,
    DebounceClickDirective,
    GenericButtonComponent,
  ],
})
export class RegistrationFormComponent extends Validation implements OnInit {
  public form!: FormGroup;
  private _confirmationDialogRef: MatDialogRef<RegistrationConfirmationDialog>;
  private _confirmationDialogSubscription: Subscription;
  private _succeeded = false;
  private _inhibit = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _userApiService: UserApiService,
    private _submitService: SubmitService,
    private _cancelService: CancelService,
    private _dialog: MatDialog,
  ) {
    super();
  }

  // Convenience getter function for form fields
  public get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required, 
        Validators.minLength(this.userNameMinLength), 
        Validators.maxLength(this.userNameMaxLength), 
        Validators.pattern("^[0-9a-zA-Z_]*$")
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
      confirm: ['', [
        Validators.required, 
        Validators.minLength(this.passwordMinLength), 
        Validators.maxLength(this.passwordMaxLength)
      ]],
    }, { 
      validators: MustMatch('password', 'confirm') 
    });
    this._succeeded = false;
  }

  public onSubmit() {
    if (this.form.invalid || this._inhibit) {
      return;
    }
    this._inhibit = true;
      
    // Return credentials
    this._submitService.emit({
      form: RegistrationFormComponent,
      credentials: {
        username: this.f.username?.value,
        email:    this.f.email?.value,
        password: this.f.password?.value,
        role:     'USER',
      }
    });

    let credentials = {
      username: this.f.username?.value,
      email:    this.f.email?.value,
      password: this.f.password?.value,
      role:     'USER',
    } as RegistrationCredentials;
    
    // POST form inputs to backend
    this._userApiService.register$(credentials).subscribe(res => {
      this._succeeded = res.statusCode >= 200 && res.statusCode < 300;
      this._confirmationDialogRef = this._dialog.open(
        RegistrationConfirmationDialog, 
        { 
          data: {
            message: res.statusMessage,
            success: this._succeeded,
          } 
        }
      );
      this._confirmationDialogSubscription = this._confirmationDialogRef
        .afterClosed()
        .subscribe(res => {
          setToken(res.access_token); // Save returned authentication token
          this.onCancel();
        });
    });
  }

  public onConfirm() {
    this._confirmationDialogSubscription.unsubscribe();
    if (this._succeeded) {
      // Close dialog
      this.onCancel();
    }
    this._inhibit = false;
  }
/*
  public onReset() {
    this.form.reset();
  }
*/
  public onCancel() {
    this._inhibit = true;
    this._cancelService.emit();
  }
}