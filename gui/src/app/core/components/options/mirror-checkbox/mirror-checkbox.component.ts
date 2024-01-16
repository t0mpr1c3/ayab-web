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
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatCheckbox, MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { TSetting } from "../../../../../../../shared/src/models/settings.model";
import { MirrorIconComponent } from "./mirror-icon.component";

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
    MirrorIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MirrorCheckboxComponent),
      multi: true
    }
  ]
})
export class MirrorCheckboxComponent implements AfterViewInit {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ transform: booleanAttribute }) disabled: boolean;
  @Input({ transform: booleanAttribute }) defaultValue: boolean = false;
  @ViewChild('checkbox') private _checkbox: MatCheckbox;
  @ViewChild('icon') private _icon: MirrorIconComponent;

  public checked: boolean = this.defaultValue;

  constructor() {}

  ngAfterViewInit(): void {
    this._checkbox.checked = this.checked;
    this.disable(this.disabled);
  }
  
  public clicked(event: MatCheckboxChange): void {
    this.checked = event.checked;
    this._icon.mirror(this.checked);
  }

  public disable(isDisabled: boolean): void {
    this._checkbox.disabled = isDisabled;
    this._icon.disable(isDisabled);
  }
}