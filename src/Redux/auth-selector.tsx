import {createSelector} from "reselect";
import {RootStateType} from "./redux-store";
import {UserType} from "../types/types";

export const selectIsAuth = (state: RootStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUser = (state: RootStateType) => {
    return state.auth.login
}
