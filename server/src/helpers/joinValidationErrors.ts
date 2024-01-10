import { ValidationError } from "class-validator";

export function joinValidationErrors(errors: ValidationError[]): string {
  return errors.map(error => Object.values(error.constraints)).join();
}