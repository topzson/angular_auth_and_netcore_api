import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchcontrolName:string){
    return(formGroup: FormGroup)=>{
        const passwordControl = formGroup.controls[controlName];
        const confirmPasswordControl = formGroup.controls[matchcontrolName];
        if(confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidator']){
            return;
        }
        if(passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({ConfirmPasswordValidator:true})
        }else{
            confirmPasswordControl.setErrors(null)
        }
    }
}