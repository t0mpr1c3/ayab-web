export class Validation {
  public userNameMinLength: number = 3;
  public userNameMaxLength: number = 20;
  public    emailMinLength: number = 5;
  public    emailMaxLength: number = 60;  
  public passwordMinLength: number = 5;
  public passwordMaxLength: number = 60;  
  
  public getUsernameError(errors: any) {
    if (errors?.required) {
      return "User name is required";
    }
    if (errors?.minlength) {
      return "Minimum length of user name is " + String(this.userNameMinLength);
    }
    if (errors?.maxlength) {
      return "Maximum length of user name is " + String(this.userNameMaxLength);
    }
    if (errors?.pattern) {
      return "Alphanumeric characters and _ only";
    }
    return '';
  }
  
  public getEmailError(errors: any) {
    if (errors?.required) {
      return "Email is required";
    }
    if (errors?.minlength) {
      return "Minimum length of email is " + String(this.emailMinLength);
    }
    if (errors?.maxlength) {
      return "Maximum length of email is " + String(this.emailMaxLength);
    }
    if (errors?.email) {
      return "Invalid email";
    }
    return '';
  }
  
  public getPasswordError(field: string, errors: any) {
    if (errors?.required) {
      return field + " is required";
    }
    if (errors?.minlength) {
      return "Minimum length of password is " + String(this.passwordMinLength);
    }
    if (errors?.maxlength) {
      return "Maximum length of password is " + String(this.passwordMaxLength);
    }
    return '';
  }
}