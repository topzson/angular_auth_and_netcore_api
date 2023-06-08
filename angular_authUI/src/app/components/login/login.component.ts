import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/heiper/validateform';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder,private auth: AuthService,private router:Router, private toast:NgToastService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required],
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin(){
    if(this.loginForm.valid){
        let loginUpObj = {
          ...this.loginForm.value,
          
          role:'',
          token:''
        }
      console.log(loginUpObj)
      //send the obj
      this.auth.login(loginUpObj).subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token);
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



}
