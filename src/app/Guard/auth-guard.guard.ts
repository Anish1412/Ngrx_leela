import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../Store/app.state';
import { authSelector } from '../auth/Store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private store:Store<AppState>,private route:Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(authSelector)
    .pipe(
      map((authenticate)=>{
        if(!authenticate){
          return this.route.createUrlTree(['auth']);
        }
        return true;
      })
    )
  }
  
}
