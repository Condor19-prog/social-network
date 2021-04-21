import {createSelector} from "reselect";
import {RootStateType} from "./redux-store";
import {UserType} from "../types/types";

const getUsersSelector = (state: RootStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users: UserType[]) => {
    return users.filter(u => true)
})
export const getPageSize = (state: RootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: RootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: RootStateType) => {
    return state.usersPage.isFetching
}
export const followingInProgress = (state: RootStateType) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: RootStateType) => {
    return state.usersPage.filter;
}