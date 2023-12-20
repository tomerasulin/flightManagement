import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function landingTimeValidator(takeoffTime: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const takeoff = new Date(takeoffTime);
    const landing = new Date(control.value);

    if (landing <= takeoff) {
      return { invalidLandingTime: true };
    }

    return null;
  };
}

@Directive({
  selector: '[appLandingTimeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LandingTimeValidatorDirective,
      multi: true,
    },
  ],
})
export class LandingTimeValidatorDirective implements Validator {
  @Input('appLandingTimeValidator') takeoffTime!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.takeoffTime
      ? landingTimeValidator(this.takeoffTime)(control)
      : null;
  }
}
