import { createAction,props } from "@ngrx/store";

const LOADING_SPINNER_ACTION = '[ shared state ] set loading spinner';
const SET_ERROR_MESSAGE = '[ shared state ] set Error Message';

export const loadingSpinnerAction = createAction(LOADING_SPINNER_ACTION,props<{ status : boolean }>());
export const setErrorMessage = createAction(SET_ERROR_MESSAGE,props<{ message : string }>());