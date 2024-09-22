import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/Store/app.state";
import { PostsService } from "src/app/services/posts.service";
import { addpost, addpostsuccess, deletepost, deletepostsuccess, loadPost, loadPostsSuccess, updatepost, updatepostsuccess } from "./posts.actions";
import { filter, map, mergeMap, switchMap, tap } from "rxjs";
import { PostData } from "src/app/Models/app.models";
import { Router } from "@angular/router";
import { loadingSpinnerAction } from "src/app/Store/Shared/shared.actions";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";

@Injectable()
export class PostsEffects {
    constructor(private action$:Actions,private posts:PostsService,private store:Store<AppState>,private route:Router){}

    postData$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(loadPost),
            mergeMap((action)=>{
                return this.posts.getPosts().pipe(
                    map((data:any)=>{
                        let posts:PostData[] = [];
                        for(let key in data){
                            data[key]['id'] = key;
                            posts.push(data[key]);
                        }
                        this.store.dispatch(loadingSpinnerAction({ status : false }));
                        this.store.dispatch(loadPostsSuccess({post : posts}))
                    }))
                })
        )
    },{ dispatch : false })

    addPost$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(addpost),
            mergeMap((action)=>{
                return this.posts.addPosts(action.post)
                .pipe(map((data)=>{
                    const post = { ...action.post, id: data.name };
                    return addpostsuccess({post});
                    
                }))
            })
        )
    })

    updatePost$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(updatepost),
            switchMap((action)=>{
                return this.posts.updatePosts(action.post).pipe(
                    map((data)=>{
                        let updatedData : Update<PostData> = {
                            id: Number(action.post.id),
                            changes : {
                                ...action.post
                            }
                        }
                        return updatepostsuccess({ post : updatedData })
                    }) 
                )
            })
        )
    })

    deletePost$ = createEffect(()=> {
        return this.action$.pipe(
            ofType(deletepost),
            switchMap((action) => {
                return this.posts.deletePosts(action.Id).pipe(
                    map((data)=>{
                        return deletepostsuccess({ Id : action.Id })
                    })
                )
            })
        )
    })

    postDetails$ = createEffect(()=>{
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r:RouterNavigatedAction)=>{
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r:RouterNavigatedAction | any)=>{
                return r.payload.routerState['params']['id'];
            }),
            switchMap((id)=>{
                return this.posts.getPostById(id).pipe(
                    map((data)=>{
                        let postData = [{ ...data,id }];
                        return loadPostsSuccess({ post : postData});
                    })
                )
            })
        )
    })


}