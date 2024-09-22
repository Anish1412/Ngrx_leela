import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./customserializer";

export const routeFeatureSelector = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const routeSelector = createSelector(routeFeatureSelector,(route)=>{
    return route.state;
})