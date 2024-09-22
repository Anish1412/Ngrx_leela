import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from './Store/app.state';
import { errorSelector, loadingSelector } from './Store/Shared/shared.selector';
import { autologin } from './auth/Store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NgRx_Leela';
  loadingSpinner!:Observable<boolean>;
  errorMessage!:Observable<string>;
  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
      this.loadingSpinner = this.store.select(loadingSelector);
      this.errorMessage = this.store.select(errorSelector);
      this.store.dispatch(autologin());
  }

}
