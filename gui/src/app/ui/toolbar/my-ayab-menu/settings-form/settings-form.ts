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

import { mapSettings, reduce } from '../../../../helpers/reduce';
import { UserData } from '../../../../models/UserData';
import { Settings, TSetting } from '../../../../models/Settings';
import { UserService } from '../../../../services/user.service';
import { CancelService } from '../../../../services/cancel.service';
import { GenericButton } from '../../../generic-button/generic-button';
import { GenericCheckbox } from '../../../generic-checkbox/generic-checkbox';
import { GenericSelect } from '../../../generic-select/generic-select';
import { SettingTemplateDirective } from './settings-template.directive';
import { SettingsList } from './settings-list/settings-list';
import { Subscription } from 'rxjs';
import { setToken } from '../../../../helpers/auth';

/** 
 * @title Settings form 
 **/
@Component({
  standalone: true,
  selector: 'settings-form',
  templateUrl: 'settings-form.html',
  styleUrls: ['settings-form.css'],
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
  private _userData: UserData;
  private _userSettings: Settings;
  private _userServiceSubscription: Subscription;
  private _inhibit: Boolean = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _cancelService: CancelService,
  ) {}

  ngOnInit(): void {
    // Get user settings
    this._userData = JSON.parse(localStorage.getItem('userData')!);
    this._userSettings = this._userData.settings;
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
    this._userData.settings = reduce(
      mapSettings(setting => ({
        key: setting.key,
        value: this.formControls[setting.key]!.value,
      }))
    );
    localStorage.setItem('userData', JSON.stringify(this._userData));
    
    // POST update to backend
    this._userServiceSubscription = this._userService
      .update$(this._userData)
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