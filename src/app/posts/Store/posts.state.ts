import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post, PostData } from '../../Models/app.models';

export interface PostState extends EntityState<PostData>{
    count:number
}

export const postAdapter = createEntityAdapter<PostData>({
    sortComparer: sortName
});

export const initialState : PostState = postAdapter.getInitialState({
    count:0
});

export function sortName(a:Post,b:Post){
    return a.title.localeCompare(b.title);
}
