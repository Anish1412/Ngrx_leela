import { Component } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { addpost } from '../Store/posts.actions';
import { Post } from 'src/app/Models/app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  constructor(private store:Store<AppState>,private route:Router) {}

  postData:FormGroup = new FormGroup({
    title: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    description: new FormControl(null,[Validators.required,Validators.minLength(6)])
  });

  submitPost(){
    const post:Post = { 
      title : this.postData.value.title, 
      content : this.postData.value.description
    }
    this.store.dispatch(addpost({post : post}));
  }

  // descErrorMessage:string | undefined;

  descriptionError(){
    let description = this.postData.get('description');
    if(description?.touched && description.invalid){
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
    // if(control.value.invalid){
    //   this.descErrorMessage = 'Description is compulsory...';
    //   return { descriptionError : true };
    // }
    return null;
  }
}
