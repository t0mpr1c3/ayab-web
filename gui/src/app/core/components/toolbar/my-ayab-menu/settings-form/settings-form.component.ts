import { 
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { mapSettings, reduce } from '../../../../helpers/reduce';
import { UserApiService } from '../../../../services/user-api.service';
import { getUser, setToken } from '../../../../services/auth/helpers/auth';
import { CancelService } from '../../../../services/cancel.service';
import { Settings, TSetting } from '../../../../../../../../shared/src/models/settings.model';
import { User } from '../../../../../../../../shared/src/models/user.model';
import { GenericButton } from '../../../generic-button/generic-button.component';
import { GenericCheckbox } from '../../../generic-checkbox/generic-checkbox.component';
import { GenericSelect } from '../../../generic-select/generic-select.component';
import { SettingTemplateDirective } from './settings-template.directive';
import { SettingsList } from './settings-list/settings-list.component';

/** 
 * @title Settings form 
 **/
@Component({
  standalone: true,
  selector: 'settings-form',
  templateUrl: 'settings-form.component.html',
  styleUrls: ['settings-form.component.css'],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule,
    GenericButton,
    GenericCheckbox,
    GenericSelect,
    SettingsList,
    SettingTemplateDirective,
  ],
})
export class SettingsForm implements OnInit, OnDestroy {
  public form!: FormGroup;
  public formControls: Record<string, FormControl<TSetting>>;
  public settingsData: { 
    key: string, 
    name: string, 
    value: TSetting, 
    enum?: string[], 
    control: FormControl<TSetting>,
  }[];
  private _user: User;
  private _userSettings: Settings;
  private _userServiceSubscription: Subscription;
  private _inhibit: Boolean = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _userApiService: UserApiService,
    private _cancelService: CancelService,
  ) {}

  ngOnInit(): void {
    // Get user settings
    this._user = getUser()!;
    this._userSettings = this._user.settings;
    console.log('_userSettings on init')
    console.log(this._userSettings)

    // Create form controls
    this.formControls = reduce(
      mapSettings(setting => ({
        key: setting.key,
        value: new FormControl<TSetting>(
          this._userSettings[setting.key as keyof Settings]
        )
      }))
    );

    // Create form group
    this.form = this._formBuilder.group(
      this.formControls
    );

    // Make dataset to generate form inputs
    this.settingsData = mapSettings(setting => ({
      key: setting.key,
      name: setting.title,
      value: this._userSettings[setting.key as keyof Settings],
      enum: setting.enum,
      control: this.formControls[setting.key]!,
    }));
  }

  ngOnDestroy(): void {
    this._userServiceSubscription.unsubscribe();
  }

  // Convenience getter to access form fields
  public get f() { return this.form.controls; }

  public onSubmit() {
    if (this._inhibit) {
      return;
    }
    this._inhibit = true;

    // Update user settings
    this._user.settings = reduce(
      mapSettings(setting => ({
        key: setting.key,
        value: this.formControls[setting.key]!.value,
      }))
    );
    localStorage.setItem('userData', JSON.stringify(this._user));
    
    // POST update to backend
    this._userServiceSubscription = this._userApiService
      .update$(this._user)
      .subscribe(res => {
        setToken(res.access_token); // Save returned authentication token
        this.onCancel();
      });
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