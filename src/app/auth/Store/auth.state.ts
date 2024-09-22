import { User } from "src/app/Models/User.model"

export interface AuthState {
    users : User | null;
}

export const initialState : AuthState = {
    users : null
}