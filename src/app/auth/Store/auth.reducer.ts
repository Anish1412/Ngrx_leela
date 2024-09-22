import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { SignupSuccess, autologout, loginsuccess } from "./auth.actions";

const _authReducer = createReducer(initialState,on(loginsuccess,(state,action)=>{
    return {
        ...state,
        users: action.user
    }
}),on(SignupSuccess,(state,action)=>{
    return {
        ...state,
        users: action.user
    }
}),on(autologout,(state)=>{
    return {
        ...state,
        users: null
    }
}));

export function authReducer(state:any,action:any){
    return _authReducer(state,action);
}