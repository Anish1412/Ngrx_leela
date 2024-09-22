import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Models/User.model";

const LOGIN_START_ACTION = '[ auth page ] login start';
const LOGIN_SUCCESS_ACTION = '[ auth page ] login success';
const LOGIN_FAILED_ACTION = '[ auth page ] login failed';
const AUTO_LOGIN_ACTION = '[ auth page ] auto login';
const AUTO_LOGOUT_ACTION = '[ auth page ] auto logout';

const SIGNUP_START_ACTION = '[ auth page ] Signup start';
const SIGNUP_SUCCESS_ACTION = '[ auth page ] Signup success';
const SIGNUP_FAILED_ACTION = '[ auth page ] Signup failed';


// LOGIN
export const loginstart = createAction(LOGIN_START_ACTION,props<{ email:string, password:string }>());
export const loginsuccess = createAction(LOGIN_SUCCESS_ACTION,props<{ user : User | null, redirect : boolean }>());
export const autologin = createAction(AUTO_LOGIN_ACTION);
export const autologout = createAction(AUTO_LOGOUT_ACTION);

// SIGNUP
export const SignupStart = createAction(SIGNUP_START_ACTION,props<{ email:string, password:string }>());
export const SignupSuccess = createAction(SIGNUP_SUCCESS_ACTION,props<{ user: User, redirect : boolean }>());