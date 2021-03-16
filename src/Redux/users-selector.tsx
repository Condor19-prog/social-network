import {rootStateType} from "./redux-store";

export const getUsers = (state: rootStateType) => {
    return state.usersPage.users
}
export const getPageSize = (state: rootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: rootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: rootStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: rootStateType) => {
    return state.usersPage.isFetching
}
export const followingInProgress = (state: rootStateType) => {
    return state.usersPage.followingInProgress
}