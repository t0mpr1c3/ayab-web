import { AbstractControl } from "@angular/forms";
import { ColorEnum } from "../../../../../../shared/src/models/color-enum.model";
import { ModeEnum } from "../../../../../../shared/src/models/mode-enum.model";

// Custom validators for options form
export default class OptionsValidator {
  static modeValidator(modeName: string, colorsName: string) {
    return (group: AbstractControl) => {
      const modeControl = group.get(modeName);
      const colorsControl = group.get(colorsName);

      if ( !modeControl || !colorsControl ) {
        return null;
      }
        
      // Set errors if validation fails
      modeControl.setErrors( null );
      colorsControl.setErrors( null );
      if (modeControl.value === ModeEnum.Single_Bed && colorsControl.value > 2) {
        modeControl.setErrors({ singleBedValidationError: true });
        colorsControl.setErrors({ singleBedValidationError: true });
      /*
      } else if (modeControl.value === ModeEnum.Ribber$_Classic && colorsControl.value > 6) {
        modeControl.setErrors({ ribberClassicValidationError: true });
        colorsControl.setErrors({ ribberClassicValidationError: true });
      } else if (modeControl.value === ModeEnum.Ribber$_Middle_Colors_x2 && colorsControl.value > 6) {
        modeControl.setErrors({ ribberMiddleColorsTwiceValidationError: true });
        colorsControl.setErrors({ ribberMiddleColorsTwiceValidationError: true });
      } else if (modeControl.value === ModeEnum.Ribber$_Heart_of_Pluto && colorsControl.value > 6) {
        modeControl.setErrors({ ribberHeartOfPlutoValidationError: true });
        colorsControl.setErrors({ ribberHeartOfPlutoValidationError: true });
      */
      } else if (modeControl.value === ModeEnum.Ribber$_Circular && colorsControl.value > 2) {
        modeControl.setErrors({ ribberCircularValidationError: true });
        colorsControl.setErrors({ ribberCircularValidationError: true });
      }
      return null;
    }
  }

  static needleValidator(startNeedleName: string, startColorName: string, stopNeedleName: string, stopColorName: string) {
    return (group: AbstractControl) => {
      const startNeedleControl = group.get(startNeedleName);
      const startColorControl = group.get(startColorName);
      const stopNeedleControl = group.get(stopNeedleName);
      const stopColorControl = group.get(stopColorName);

      if ( !startNeedleControl || !startColorControl || !stopNeedleControl || !stopColorControl ) {
        return null;
      }

      let start = (startColorControl.value === ColorEnum.orange) ?
        -startNeedleControl.value : startNeedleControl.value;
      let stop = (stopColorControl.value === ColorEnum.orange) ?
        -stopNeedleControl.value : stopNeedleControl.value;
        
      // Set errors if validation fails
      if (start < stop) {
        startNeedleControl.setErrors( null );
        startColorControl.setErrors( null );
        stopNeedleControl.setErrors( null );
        stopColorControl.setErrors( null );
      } else {
        startNeedleControl.setErrors({ needleValidationError: true });
        startColorControl.setErrors({ needleValidationError: true });
        stopNeedleControl.setErrors({ needleValidationError: true });
        stopColorControl.setErrors({ needleValidationError: true });
      }
      return null;
    }
  }
}