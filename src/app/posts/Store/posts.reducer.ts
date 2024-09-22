import { createReducer,on } from "@ngrx/store"
import { initialState, postAdapter } from "./posts.state"
import { addpostsuccess, deletepostsuccess, loadPostsSuccess, updatepostsuccess } from "./posts.actions";

const _postReducer = createReducer(initialState,on(addpostsuccess,(state:any,action:any)=>{
    // const post = { ...action.post }
    // // post.id = state.posts.length+1;
    // return {
    //     ...state,
    //     /* As state data is immutable, we cannot make changes to existing state instead, we are going to
    //        create a New State and going to update the STORE with new State */
    //     posts: [...state.posts, post]
    // }
    return postAdapter.addOne(action.post,{...state, count:state.count+1 });
}),on(updatepostsuccess,(state:any,action:any)=>{
    // // Using Map Method, we are looping over whole post from the state and trying to match the IDs
    // // If the ID gets matched, then, we will return the data which we got through action
    // // Or we will send as it is post data.
    // let updatedData = state.posts.map((post:any)=>{
    //     return action.post.id === post.id ? action.post : post;
    // })
    // return {
    //     ...state,
    //     // State is immutable, but, we're not sending the new Data, we are just making changes in 
    //     // the existing state. So, we will pass the data which we got using Map method.
    //     posts: updatedData
    // }
    return postAdapter.updateOne(action.post,state);
}),on(deletepostsuccess,(state:any,action:any)=>{
    // const deleteData = state.posts.filter((post:any)=>{
    //     return action.Id !== post.id;
    // })
    // return {
    //     ...state,
    //     posts : deleteData
    // }
    return postAdapter.removeOne(action.Id,state);
}),on(loadPostsSuccess,(state:any,action:any)=>{    
    // return {
    //     ...state,
    //     posts : action.post
    // }
    return postAdapter.setAll(action.post,{...state, count: state.count+1 });
}))

export function postReducer(state:any,action:any){
    return _postReducer(state,action);
}
