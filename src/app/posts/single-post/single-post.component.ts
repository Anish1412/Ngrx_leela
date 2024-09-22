import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostData } from 'src/app/Models/app.models';
import { AppState } from 'src/app/Store/app.state';
import { postDataById } from '../Store/posts.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  constructor(private store:Store<AppState>){}

  post:Observable<PostData> = this.store.select(postDataById);
}
