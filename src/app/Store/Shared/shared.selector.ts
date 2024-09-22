import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';
// We can also use particular state in generic instead of using global State
const loadingFeatureSelector = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const loadingSelector = createSelector(loadingFeatureSelector,(state)=>{
    return state.loadingSpinner;
})

export const errorSelector = createSelector(loadingFeatureSelector,(state)=>{
    return state.errorMessage;
})