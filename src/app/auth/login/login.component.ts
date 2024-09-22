import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { loginstart } from '../Store/auth.actions';
import { loadingSpinnerAction, setErrorMessage } from 'src/app/Store/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private store:Store<AppState>){}

  LoginForm : FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(5)])
  })

  onSubmit(){
    // console.log(this.LoginForm.value);
    const email = this.LoginForm.value.email;
    const password = this.LoginForm.value.password;
    this.store.dispatch(loadingSpinnerAction({ status : true }));
    this.store.dispatch(loginstart({email,password}));
  } 

  emailError(){
    let email = this.LoginForm.get('email');
    if(email?.touched && email.invalid){
      if(email?.errors?.['required']){
        return `Email is compulsory`;
      }
      if(email?.errors?.['email']){
        return `Enter correct email format abc@xyz.com`;
      }
    }
    return null;
  }

  PasswordError(){
    let description = this.LoginForm.get('password');
    if(description?.touched && description?.invalid){
      if(description?.errors?.['required']){
        return `Password is compulsory`;
      }
    }
    return null;
  }

}
