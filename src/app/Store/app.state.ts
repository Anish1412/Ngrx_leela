import { SharedState } from "./Shared/shared.state";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";
import { sharedReducer } from "./Shared/shared.reducer";
import { AUTH_STATE_NAME } from "../auth/Store/auth.selectors";
import { AuthState } from "../auth/Store/auth.state";
import { authReducer } from "../auth/Store/auth.reducer";
import { RouterReducerState, routerReducer } from "@ngrx/router-store";

// Create a interface for global State
export interface AppState {
    // count : counterState,
    // post : PostState
    [SHARED_STATE_NAME]:SharedState,

    // 1) Login feature module is a lazy-loading module, it will not start until & unless we click in it
    // & also can't use it's properties from State because, it will also be not available until & unless
    // we start this module.
    // 2) So, that's why, we are using this state in the global state file of login lazy-loading feature module
    // to be available to use at starting.
    [AUTH_STATE_NAME]:AuthState,
    router: RouterReducerState
}

// 1) Create a variable for global Reducer which will store an object of sub-reducers in key-value pairs
// 2) We can directly use this variable in app.module.ts file in StoreModule.forRoot() instead of creating
// an object and storing reducers in key-value pairs in app.module.ts
// 3) While debugging, we will see these names in redux in raw section
export const appReducer = {
    // counter : counterReducer,
    // posts : postReducer
    [SHARED_STATE_NAME]:sharedReducer,

    // 1) Login feature module is a lazy-loading module, it will not start until & unless we click in it
    // & also can't use it's properties from Reducer because, it will also be not available until & unless
    // we start this module.
    // 2) So, that's why, we are using this reducer in the global state file of login lazy-loading feature module
    // to be available to use at starting
    [AUTH_STATE_NAME]:authReducer,
    router: routerReducer
}
