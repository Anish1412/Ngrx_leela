import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { autologout } from 'src/app/auth/Store/auth.actions';
import { authSelector } from 'src/app/auth/Store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private store: Store<AppState>){}

  isAuthenticated!:Observable<boolean>;
  ngOnInit(): void {
      this.isAuthenticated = this.store.select(authSelector);
  }

  autoLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autologout());
  }
}
