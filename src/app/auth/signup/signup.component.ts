import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { SignupStart } from '../Store/auth.actions';
import { loadingSpinnerAction } from 'src/app/Store/Shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private store:Store<AppState>){}

  SignupForm : FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required])
  })

  onSubmit(){
    let email = this.SignupForm.value.email;
    let password = this.SignupForm.value.password;
    this.store.dispatch(SignupStart({ email, password }));
    this.store.dispatch(loadingSpinnerAction({ status : true }));
  }
}
