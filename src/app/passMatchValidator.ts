

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const pass = control.get('password')?.value
  const confirmPass = control.get('confirmPassword')?.value

  if(pass && confirmPass && pass !== confirmPass) {
    return{passMissMatch: true}
  }
  return null
}


  // passwordMatchValidator(form: any) {
  //   return form.get('password')?.value === form.get('confirmPassword')?.value
  //     ? null
  //     : { passMissMatch: true };
  // }        دي فانكشن بتكتب ف ts بدل الفاليداتور
