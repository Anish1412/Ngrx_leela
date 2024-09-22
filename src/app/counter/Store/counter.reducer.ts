import { changeTitle, customIncrement, decrement, increment,reset } from "./counter.actions";
import { initialState } from "./counter.state";
import { createReducer,on } from '@ngrx/store';

const _counterReducer = createReducer(initialState,on(increment,(state)=>{
    return {
        ...state,
        count : state.count+1
    }
}),on(decrement,(state)=>{
    return {
        ...state,
        count : state.count-1
    }
}),on(reset,(state)=>{
    return {
        ...state,
        count : 0
    }
}),on(customIncrement,(state,action)=>{
    // Action stores an object with properties 'value' & 'type'
    // console.log(action)
    return {
        ...state,
        count : state.count + action.value
    }
}),on(changeTitle,(state)=>{
    return {
        ...state,
        changeTitle : 'Modified Leela Web Dev'
    }
}))

export function counterReducer(state:any ,action: any){
    return _counterReducer(state,action);
}