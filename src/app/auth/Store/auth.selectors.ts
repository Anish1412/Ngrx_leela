import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = "auth";
const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const authSelector = createSelector(authFeatureSelector,(state)=>{
    return state.users ? true : false;
})

export const getToken = createSelector(authFeatureSelector,(state)=>{
    return state.users ? state.users.userToken : null;
})