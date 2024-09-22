import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './Store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './Store/auth.effects';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'Signup',
        component:SignupComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    // We are removing this Auth reducer over from here, because, we are using it globally in the app.state.ts
    // StoreModule.forFeature("auth",authReducer),
    RouterModule.forChild(routes)
  ]
})

export class AuthModule { }
