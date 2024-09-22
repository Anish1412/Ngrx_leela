import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.state';
import { getToken } from '../auth/Store/auth.selectors';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store:Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(getToken).pipe(
      take(1),
      exhaustMap((token)=>{
        if(!token){
          return next.handle(request);
        }
        let modifiedRequest = request.clone({
          params: request.params.append('auth',token)
        })
        return next.handle(modifiedRequest);
      })
    )
  }
  
}
