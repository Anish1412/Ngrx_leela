import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  SignupStart,
  SignupSuccess,
  autologin,
  autologout,
  loginstart,
  loginsuccess,
} from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import {
  loadingSpinnerAction,
  setErrorMessage,
} from 'src/app/Store/Shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private store: Store<AppState>,
    private route: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      // Actions get filter through ofType operator whenever it is dispatched
      ofType(loginstart),
      mergeMap((action) => {
        return this.auth.loginStart(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(loadingSpinnerAction({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.auth.formatUser(data);
            this.auth.setUserInLocalStorage(user);
            // We have dispatched loginsuccess Action from Auth Action
            return loginsuccess({ user, redirect: true });
          }),
          catchError((error) => {
            let errorCode = error.error.error.message;
            this.store.dispatch(loadingSpinnerAction({ status: false }));
            let errorMessage = 'An Error ocurred, Please try again!!';
            switch (errorCode) {
              case 'EMAIL_NOT_FOUND':
                errorMessage = "EmailID didn't found!!";
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'Wrong Password!!';
                break;
              case 'USER_DISABLED':
                  errorMessage = 'your account has been disabled!!';
                  break;
            }
            // We have dispatched setErrorMessage Action from Shared Action. catchError doesn't returns
            // an observable so we are using of() operator to convert into observable
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginNavigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        // We can take multiple actions like this
        ofType(...[loginsuccess,SignupSuccess]),
        // tap operator doesn't returns an data
        tap((action) => {
          if(action.redirect){
            this.route.navigate(['']);
          }
        })
      );
    },
    // Here, we're not dispatching any action
    { dispatch: false }
  );

  autoLogin$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(autologin),
      mergeMap((action)=>{
        const user = this.auth.getUserInLocalStorage();
        return of(loginsuccess({ user, redirect: false }))
      })
    )
  });

  autoLogout$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(autologout),
      map((action)=>{
        this.auth.autoLogout();
        this.route.navigate(['auth']);
      })
    )
  },{ dispatch:false })

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SignupStart),
      mergeMap((action) => {
        return this.auth.signUpStart(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(loadingSpinnerAction({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            let user = this.auth.formatUser(data);
            this.auth.setUserInLocalStorage(user);
            return SignupSuccess({ user, redirect: true });
          }),
          catchError((error) => {
            let errorCode = error.error.error.message;
            let errorMessage = 'An Error ocurred, Please try again!!';
            this.store.dispatch(loadingSpinnerAction({ status: false }));
            switch (errorCode) {
              case 'EMAIL_EXISTS':
                errorMessage = 'EmailId already exists';
                break;
            }
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });


//   signupNavigate$ = createEffect(
//       () => {
//         return this.actions$.pipe(
//           ofType(SignupSuccess),
//           // tap operator doesn't returns an data
//           tap((action) => {
//             this.route.navigate(['']);
//           })
//         );
//       },
//       // Here, we're not dispatching any action
//       { dispatch: false }
//     );
}

