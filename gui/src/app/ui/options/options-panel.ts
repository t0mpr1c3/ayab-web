import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { OptionsForm } from "./options-form/options-form";
import { PortSelect } from "./port-select/port-select";
import { RowInput } from "./row-input/row-input";
import { ColorsInput } from "./colors-input/colors-input";
import { NeedleInput } from "./needle-input/needle-input";
import { GenericCheckbox } from "../generic-checkbox/generic-checkbox";
import { GenericSelect } from "../generic-select/generic-select";
import { ModeEnum } from "../../models/ModeEnum";
import { AlignmentEnum } from "../../models/AlignmentEnum";
import { enumArray } from "../../helpers/enum";

/**
 * @title Options panel
 */
@Component({
  standalone: true,
  selector: 'options-panel',
  templateUrl: 'options-panel.html',
  styleUrls: ['options-panel.css'],
  imports: [
    OptionsForm, 
    PortSelect,
    RowInput, 
    ColorsInput, 
    NeedleInput, 
    GenericSelect, 
    GenericCheckbox,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class OptionsPanel {
  public modeEnum = enumArray(ModeEnum);
  public alignmentEnum = enumArray(AlignmentEnum);
  public knitSideImageSetting: Boolean;

  public knitSideImageCheckboxClicked(val: Boolean) {
    this.knitSideImageSetting = val;
    // FIXME update local storage object
  }
}