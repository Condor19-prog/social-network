import {actionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
export type setUsersActionType = {
    type: 'SET-USERS'
    users: Array<userType>
}
export type followingIsProgressType = {
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS'
    isFetching: boolean
    userId: number
}
export type followActionType = {
    type: 'FOLLOW'
    userId: number
}
export type UnFollowActionType = {
    type: 'UNFOLLOW'
    userId: number
}
export type setCurrentPageType = {
    type: 'SET-CURRENT-PAGE'
    pageNumber: number
}
export type setUsersTotalCountType = {
    type: 'SET-USERS-TOTAL-COUNT'
    count: number
}
export type setIsFetchingType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}
export type userType = {
    id: number
    photos: {
        small: string
        large: string
    }
    name: string
    status: string
    followed: boolean
}

type stateType = typeof initialState

const initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingIsProgress: [] as Array<any>
}


export const usersReducer = (state: stateType = initialState, action: actionsType): stateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            debugger
            return {...state, currentPage: action.pageNumber}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingIsProgress: action.isFetching ?
                    [...state.followingIsProgress, action.userId] :
                    [state.followingIsProgress.filter(id => id !== action.userId)]
            }
        }
        default:
            return state
    }
}

export const followSuccess = (userId: number): followActionType => {
    return {type: FOLLOW, userId}
}
export const unFollowSuccess = (userId: number): UnFollowActionType => {
    return {type: UNFOLLOW, userId}
}
export const setUsers = (users: Array<userType>): setUsersActionType => {
    return {type: SET_USERS, users}
}
export const setCurrentPage = (pageNumber: number): setCurrentPageType => {
    return {type: SET_CURRENT_PAGE, pageNumber}
}
export const setUsersTotalCount = (totalCount: number): setUsersTotalCountType => {
    return {type: SET_USERS_TOTAL_COUNT, count: totalCount}
}
export const toggleIsFetching = (isFetching: boolean): setIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): followingIsProgressType => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}
export const getUsersTC = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setUsersTotalCount(data.totalCount))
            })
    }
}
export const followTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(followSuccess(userId))
                    }
                    dispatch(toggleIsFollowingProgress(false, userId))
                }
            )
    }
}
export const unFollowTC = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(unFollowSuccess(userId))
                    }
                    dispatch(toggleIsFollowingProgress(false, userId))
                }
            )
    }
}


export default usersReducer