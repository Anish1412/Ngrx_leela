import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/Models/app.models';
import { AppState } from 'src/app/Store/app.state';
import { postDataById } from '../Store/posts.selectors';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatepost } from '../Store/posts.actions';
import { routeSelector } from 'src/app/Store/router/router.selectors';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit, OnDestroy {
  constructor(private store:Store<AppState>,private route:Router){}

  updateData!:FormGroup;
  postData!:Subscription;
  post !: Post;
  ngOnInit(): void {
    this.createForm();
    this.postData = this.store.select(postDataById).subscribe((res:any)=>{
      if(res){
        this.post = res;
        this.updateData.patchValue({
          title: res.title,
          content: res.content
        })
      }
    })
      // this.editpost.params.subscribe((res)=>{
      //   const id = res['id'];
      //   console.log("ID : ",id);
      //   this.postData = this.store.select(postDataById, {id}).subscribe((res)=>{
      //     console.log(res);
      //     this.post = res;
          
      //   })
      // })

    }
    
    createForm(){
    this.updateData = new FormGroup({
      title : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      content : new FormControl(null,[Validators.required,Validators.minLength(10)])
    })
  }

  updatePost(){
    const updatepostdata : Post = {
      id: this.post.id,
      title: this.updateData.value.title,
      content: this.updateData.value.content
    }
    this.store.dispatch(updatepost({post : updatepostdata }));
  }

  descriptionError(){
    let description = this.updateData.get('content');
    if(description?.invalid && description?.touched){
      if(description?.errors?.['required']){
        // this.descErrorMessage = 'Description is compulsory...';
        // return { descriptionError : true };
        return 'Description is compulsory...';
      }
      if(description?.errors?.['minlength']){
        // this.descErrorMessage = 'Minimum 6 characters are compulsory...';
        // return { descriptionError : true };
        return 'Minimum 6 characters are compulsory...';
      }
    }
    return null;
  }

  ngOnDestroy(): void {
      this.postData.unsubscribe();
  }
}
