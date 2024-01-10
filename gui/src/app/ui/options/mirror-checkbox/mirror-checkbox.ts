import { Component, Input, forwardRef } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { TSetting } from "../../../models/Settings";
import { GenericCheckbox } from "../../generic-checkbox/generic-checkbox";
import { MirrorIcon } from "./mirror-icon/mirror-icon";

/**
 * @title Mirror checkbox
 */
@Component({
  standalone: true,
  selector: 'mirror-checkbox',
  templateUrl: 'mirror-checkbox.html',
  styleUrls: ['mirror-checkbox.css'],
  imports: [
    GenericCheckbox,
    MatIconModule,
    MatButtonModule,
    MirrorIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MirrorCheckbox),  // replace name as appropriate
      multi: true
    }
  ]
})
export class MirrorCheckbox {
  @Input({ required: true }) control: FormControl<TSetting>;
  @Input({ required: true }) disabled: boolean;

  public knitSideImageSetting: boolean;
  
  public knitSideImageCheckboxClicked(val: boolean) {
    this.knitSideImageSetting = val;
  }
}