import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterState } from "./counter.state";

// StateName inside generic and Reducer VariableName in bracket in single-inverted comma
export const COUNTER_STATE_NAME = 'counter';
const getSelector = createFeatureSelector<counterState>(COUNTER_STATE_NAME);

export const getCounter = createSelector(getSelector,(state)=>{
    return state.count;
})

export const getChangeTitle = createSelector(getSelector,(state)=>{
    return state.changeTitle;
})