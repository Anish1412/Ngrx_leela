import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.state';
import { Observable, Subscription } from 'rxjs';
import { postCount, postData } from './Store/posts.selectors';
import { Post, PostData } from '../Models/app.models';
import { deletepost, loadPost } from './Store/posts.actions';
import { PostsService } from '../services/posts.service';
import { loadingSpinnerAction } from '../Store/Shared/shared.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(private store: Store<AppState>, private posts:PostsService, private jitu:ActivatedRoute) {}

  postsReolverData!:PostData[];
  postData:Observable<PostData[] | null> = this.store.select(postData);
  count:Observable<Number> = this.store.select(postCount);
  newPostData!:PostData[];
  ngOnInit(): void {
    setTimeout(()=>{
      this.store.dispatch(loadingSpinnerAction({ status : true }));
    },0)
    this.store.dispatch(loadPost());
  }

  deletePost(id:any){
    if(confirm("Do you want to delete this post?")){
      this.store.dispatch(deletepost({Id:id}));
    }
  }

}
