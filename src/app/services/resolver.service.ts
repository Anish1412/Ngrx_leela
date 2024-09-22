import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../Store/app.state';
import { postData } from '../posts/Store/posts.selectors';
import { PostsService } from './posts.service';
import { PostData } from '../Models/app.models';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{

  constructor(private store:Store<AppState>,private posts:PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.select(postData);
    // .subscribe((data)=>{
    //   return data;
    // })
    // let postData!:PostData[];
    return this.posts.getPosts();
    // .subscribe((data:any)=>{
    //   postData = data;
    //   return data;
    // })
    // return postData;
  }
}
