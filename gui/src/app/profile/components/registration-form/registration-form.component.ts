import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import * as fromUser from '../../actions/user.actions';

import { MustMatch } from '../../helpers/must-match'; // custom validator
import { SubmitService } from '../../../core/services/submit.service';
import { CancelService } from '../../../core/services/cancel.service';
import { DebounceClickDirective } from '../../../core/directives/debounce.directive';
import { Validation } from '../../../../../../shared/src/models/validation.model';
import { RegistrationCredentials } from '../../../../../../shared/src/models/credentials.model';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  selector: '',
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    DebounceClickDirective,
    GenericButtonComponent,
  ],
})
export class RegistrationFormComponent extends Validation implements OnInit {
  public form!: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _submitService: SubmitService,
    private _cancelService: CancelService,
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
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let credentials = {
      username: this.f.username?.value,
      email:    this.f.email?.value,
      password: this.f.password?.value,
      role:     'USER',
    } as RegistrationCredentials;
      
    // Return credentials
    this._submitService.emit({
      action: fromUser.registration,
      payload: { credentials: credentials }
    });    
  }
/*
  public onReset() {
    this.form.reset();
  }
*/
  public onCancel() {
    this._cancelService.emit();
  }
}