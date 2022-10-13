import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MustMatchValidator {
  passwordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControlValue = control.get('password')?.value;
      const confirmPasswordControlValue = control.get('confirmPassword')?.value;
      if (passwordControlValue !== confirmPasswordControlValue) {
        return { valuesDoNotMatch: true };
      } else {
        return null;
      }
    };
  }
}
