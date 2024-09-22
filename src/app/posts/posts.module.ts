import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddpostComponent } from "./addpost/addpost.component";
import { EditpostComponent } from "./editpost/editpost.component";
import { PostsComponent } from "./posts.component";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { POST_STATE_NAME } from "./Store/posts.selectors";
import { postReducer } from "./Store/posts.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./Store/posts.effects";
import { SinglePostComponent } from './single-post/single-post.component';

const routes:Routes = [
    {
        path: '',
        component: PostsComponent,
        children: [
          {
            path: 'addpost',
            component: AddpostComponent,
          },
          {
            path: 'editpost/:id',
            component:EditpostComponent
          }
        ],
      },
];

@NgModule({
    declarations:[
        PostsComponent,
        AddpostComponent,
        EditpostComponent,
        SinglePostComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(POST_STATE_NAME,postReducer),
        EffectsModule.forFeature([PostsEffects])
    ]
})

export class PostsModule {}