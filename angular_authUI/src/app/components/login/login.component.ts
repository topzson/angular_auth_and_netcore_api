import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/heiper/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  constructor(private fb: FormBuilder,private auth: AuthService,private router:Router, private toast:NgToastService, private userStore: UserStoreService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required],
    });
    this.auth.signOut();
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      //send the obj
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
        
          this.toast.error({detail:"ERROR", summary:"Something when wrong", duration: 5000});
          console.log(err);
        }
      });
    }else{
      
      //throw error
      ValidateForm.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid")
    }

  }

  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail="";
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();
      //API call to be done.
    }
  }
}
