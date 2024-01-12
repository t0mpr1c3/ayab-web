import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  Input, 
  OnInit, 
  ViewChild, 
  booleanAttribute, 
  forwardRef 
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatCheckbox, MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { TSetting } from "../../../models/settings.model";
import { MirrorIcon } from "./mirror-icon/mirror-icon.component";
import { Observable, of } from "rxjs";

/**
 * @title Mirror checkbox
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mirror-checkbox',
  templateUrl: 'mirror-checkbox.component.html',
  styleUrls: ['mirror-checkbox.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MirrorIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MirrorCheckbox),
      multi: true
    }
  ]
})
export class MirrorCheckbox implements AfterViewInit {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;
  @ViewChild('checkbox') private _checkbox: MatCheckbox;
  @ViewChild('icon') private _icon: MirrorIcon;

  private _checked: boolean = this.defaultValue;
  public checked$: Observable<boolean> = of(this._checked);
  
  public clicked(event: MatCheckboxChange): void {
    this._checked = event.checked;
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.isDisabled(this.disabled);
  }

  public isDisabled(disabled: boolean): void {
    this._checkbox.disabled = disabled;
    this._icon.isDisabled(disabled);
  }
}