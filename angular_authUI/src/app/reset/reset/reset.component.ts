import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/heiper/confirm-password.validator';
import ValidateForm from 'src/app/heiper/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit{

  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj = new ResetPassword();
  
  constructor(private router:Router, private toast:NgToastService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetService:ResetPasswordService){}

  ngOnInit(): void {
      this.resetPasswordForm = this.fb.group({
        password:[null, Validators.required],
        confirmpassword:[null, Validators.required]
      },{
        validator: ConfirmPasswordValidator("password","confirmpassword")
      });

      this.activatedRoute.queryParams.subscribe(val=>{
        this.emailToReset = val['email'];
        let urlToken = val['code'];

        this.emailToken = urlToken.replace(/ /g,'+');

      })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmpassword;
      this.resetPasswordObj.emailToken =this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          this.toast.success({
            detail:"SUCCESS",
            summary: "Password Reset Successfully",
            duration:3000,
          });
          this.router.navigate(["/"]);
        },
        error:(err)=>{
          this.toast.error({
            detail:"ERROR",
            summary: "Something went worong",
            duration:3000,
          });
        }
      })
    }else{
      ValidateForm.validateAllFormFileds(this.resetPasswordForm);
    }
  }

}
