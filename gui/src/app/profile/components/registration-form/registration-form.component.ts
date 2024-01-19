import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import CustomValidator from '../../helpers/custom-validator.helper';
import { CancelService } from '../../../core/services/cancel.service';
import { ProfileFacade } from '../../facade/profile.facade';
import { DebounceClickDirective } from '../../../core/directives/debounce.directive';
import { Validation } from '../../../../../../shared/src/models/validation.model';
import { GenericButtonComponent } from '../../../core/components/generic-button/generic-button.component';

@Component({
  standalone: true,
  templateUrl: 'registration-form.component.html',
  styleUrls: ['registration-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    DebounceClickDirective,
    GenericButtonComponent,
  ],
  providers: [ProfileFacade],
})
export class RegistrationFormComponent extends Validation implements OnInit {
  public form!: FormGroup;
  
  constructor(
    private _cancelService: CancelService,
    private _facade: ProfileFacade,
    private _formBuilder: FormBuilder,
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
      validators: CustomValidator.MustMatch('password', 'confirm') 
    });
  }

  // Convenience getter function for form fields
  public get f() { return this.form.controls; }

  public onCancel() {
    this._cancelService.emit();
  }

  /*
  public onReset() {
    this.form.reset();
  }
  */

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
      
    // Submit credentials
    this._facade.registration({
      username: this.f.username?.value,
      email:    this.f.email?.value,
      password: this.f.password?.value,
      role:     'USER',
    });
  }
}