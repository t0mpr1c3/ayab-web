import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { Validation } from '../../../../models/validation.model';
import { GenericButton } from '../../../generic-button/generic-button.component';
import { CancelService } from '../../../../services/cancel.service';
import { AuthMachineService } from '../../../../services/auth-machine/auth-machine.service';
import { LoginSubmit } from '../../../../services/auth-machine/auth-machine.events';

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
    GenericButton,
  ],
})
export class LoginForm extends Validation implements OnInit {
  public form: FormGroup;
  public loading$: Observable<boolean>;
  private _canceled = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authMachineService: AuthMachineService,
    private _cancelService: CancelService,
  ) {
    super();

    // Close dialog when logged in
    this._authMachineService.service.subscribe(state => {
      console.log(`state: ${state.value}`);
      if (state.value === 'loggedIn') {
        this.onCancel();
        console.log('UserData:');
        console.log(localStorage.getItem('userData'));
      }
      /*
      if (state.value === 'requestErr') {
        // display errors
      }
      */
    });
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
      
    // Send authentication details to backend
    this._authMachineService.service
      .send(new LoginSubmit(this.f.username?.value, this.f.password?.value));
  }  

  public onCancel(): void {
    this._canceled = true;
    this._cancelService.emit();
  }
}
