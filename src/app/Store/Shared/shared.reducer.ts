import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { loadingSpinnerAction, setErrorMessage } from "./shared.actions";

const _sharedReducer = createReducer(initialState,on(loadingSpinnerAction,(state,action)=>{
    return {
        ...state,
        loadingSpinner: action.status
    }
}),on(setErrorMessage,(state,action)=>{
    return {
        ...state,
        errorMessage: action.message
    }
}))

export function sharedReducer(state:any, action:any){
    return _sharedReducer(state,action);
}
