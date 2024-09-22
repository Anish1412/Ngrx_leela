import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostData } from '../Models/app.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  BASE_URL = `https://posts-772f3-default-rtdb.firebaseio.com/posts`;
  constructor(private http:HttpClient) { }

  getPosts() {
    return this.http.get<Post>(`${this.BASE_URL}.json`);
  }

  addPosts(data:Post): Observable<{ name : string}>{
    return this.http.post<{ name : string}>(`${this.BASE_URL}.json`,data);
  }

  updatePosts(data:Post) {
    const postData =  {
      [String(data.id)] : { title : data.title, content: data.content }
    }
    return this.http.patch(`${this.BASE_URL}.json`,postData);
  }

  deletePosts(id:string){
    return this.http.delete(`${this.BASE_URL}/${id}.json`);
  }

  getPostById(id:string): Observable<PostData> {
    return this.http.get<PostData>(`${this.BASE_URL}/${id}.json`);
  }
}
