import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState, postAdapter } from "./posts.state";
import { routeSelector } from "src/app/Store/router/router.selectors";
import { RouterStateUrl } from "src/app/Store/router/customserializer";

export const POST_STATE_NAME = 'posts';
const posts = createFeatureSelector<PostState>(POST_STATE_NAME);
export const postSelectors = postAdapter.getSelectors();

// export const postData = createSelector(posts,(state)=>{
//     return state.posts;
// })

export const postData = createSelector(posts,postSelectors.selectAll);

export const postEntities = createSelector(posts,postSelectors.selectEntities);

// export const postDataById = createSelector(posts,routeSelector,(state:any,route:RouterStateUrl)=>{
//     // Props id type was not getting matched with the id of the state because,
//     // Props id is string and state id is Number & we were using strict equality opeartor (===)
//     // So, Now we can either use loose equality operator or convert props.id into Number type
    
//     // return state.posts.find((posts:any) => posts.id === Number(props.id));
//     return state.posts ? state.posts.find((posts:any) => posts.id === route.params['id']) : null;
// })

export const postDataById = createSelector(postEntities,routeSelector,(posts:any,route:RouterStateUrl)=>{
    return posts ? posts[route.params['id']] : null;
})

export const postCount = createSelector(posts,(state)=>{
    return state.count;
})
