import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post, PostData } from "src/app/Models/app.models";

const ADD_POST_ACTION = '[ posts page ] add post';
const ADD_POST_SUCCESS_ACTION = '[ posts page ] add post success';
const UPDATE_POST_ACTION = '[ posts page ] update post';
const UPDATE_POST_SUCCESS_ACTION = '[ posts page ] update post success';
const DELETE_POST_ACTION = '[ posts page ] delete post';
const DELETE_POST_SUCCESS = '[ posts page ] delete post success';
const LOAD_POSTS = '[ posts page ] load posts';
const LOAD_POSTS_SUCCESS = '[ posts page ] load posts success';

export const addpost = createAction(ADD_POST_ACTION,props<{ post : Post}>());
export const addpostsuccess = createAction(ADD_POST_SUCCESS_ACTION,props<{ post : Post}>());
export const updatepost = createAction(UPDATE_POST_ACTION,props<{ post : Post}>());
export const updatepostsuccess = createAction(UPDATE_POST_SUCCESS_ACTION,props<{ post : Update<PostData> }>());
export const deletepost = createAction(DELETE_POST_ACTION,props<{Id:string}>());
export const deletepostsuccess = createAction(DELETE_POST_SUCCESS,props<{Id:string}>());
export const loadPost = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS,props<{ post : PostData[]}>());