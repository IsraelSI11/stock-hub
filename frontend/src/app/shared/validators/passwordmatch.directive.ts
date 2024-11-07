import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMathValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordControl = control.get('password');
        const passwordConfirmControl = control.get('confirmPassword');
        if (passwordControl && passwordConfirmControl) {
            if (passwordControl.value === passwordConfirmControl.value) {
                return null;
            }
        }
        return { passwordMismatch: true };
    };
}