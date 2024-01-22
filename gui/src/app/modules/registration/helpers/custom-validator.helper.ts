import { AbstractControl } from '@angular/forms';

// Custom validator to check that two fields match
export default class CustomValidator {
  static MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      // Return if another validator has already found an error on the matchingControl
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      // Set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    }
  }
}