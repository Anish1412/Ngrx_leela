import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRestApiData } from '../Models/auth.model';
import { User } from '../Models/User.model';
import { AppState } from '../Store/app.state';
import { Store } from '@ngrx/store';
import { autologout } from '../auth/Store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timerId:any;
  web_API:string = "AIzaSyBEo1LTZxMxST0qDTN1iduJsuHAJ6uA0g4";
  constructor(private http:HttpClient,private store: Store<AppState>) { }

  loginStart(email:string, password:string){
    return this.http.post<AuthRestApiData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.web_API}`,
    {email,password,returnSecureToken:true});
  }

  formatUser(data:AuthRestApiData){
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email,data.idToken,data.localId,expirationDate);
    return user;
  }

  signUpStart(email:string, password:string){
    return this.http.post<AuthRestApiData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.web_API}`,{
      email,password,returnSecureToken:true
    })
  }

  setUserInLocalStorage(user: User){
    let u = localStorage.setItem('userData',JSON.stringify(user));
    this.runTimeInterval(user);
  }

  runTimeInterval(user: User){
    let todaysDate = new Date().getTime();
    let expireDate = user.eDate.getTime();
    let timeInterval = expireDate - todaysDate;
    this.timerId = setTimeout(()=>{
      // Autologout functionality
      this.store.dispatch(autologout());
    },timeInterval);
  }

  getUserInLocalStorage(){
    let userData = localStorage.getItem('userData');
    if(userData){
      let uData = JSON.parse(userData);
      let expirationDate = new Date(uData.expirationDate);
      let user = new User(uData.email,uData.idToken,uData.localId,expirationDate);
      this.runTimeInterval(user);
      return user;
    }
    return null;
  }

  autoLogout(){
    localStorage.removeItem('userData');
    if(this.timerId){
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

}
