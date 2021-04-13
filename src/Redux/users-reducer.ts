import {actionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {userType} from "../types/types";
import {createDeflateRaw} from "zlib";
import {updateObjectInArray} from "../utils/objectHelpers";

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
export type followingInProgressType = ReturnType<typeof toggleInFollowingProgress>
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
    currentPage: number
}
export type setUsersTotalCountType = {
    type: 'SET-USERS-TOTAL-COUNT'
    count: number
}
export type setIsFetchingType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}

type initialStateType = typeof initialState

const initialState = {
    users: [] as userType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}


export const usersReducer = (state: initialStateType = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                //     state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return <initialStateType>{
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    [state.followingInProgress.filter(id => id !== action.userId)]
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
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}
export const setUsersTotalCount = (totalCount: number): setUsersTotalCountType => {
    return {type: SET_USERS_TOTAL_COUNT, count: totalCount}
}
export const toggleIsFetching = (isFetching: boolean): setIsFetchingType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
export const toggleInFollowingProgress = (isFetching: boolean, userId: number) => {
    return ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)
}
export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))
}
const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: Function) => {
    dispatch(toggleInFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleInFollowingProgress(false, userId))
}
export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.follow.bind(userId)
     followUnfollowFlow(dispatch, userId, apiMethod, followSuccess)
}

export const unFollowTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(userId)
    followUnfollowFlow(dispatch, userId, apiMethod, unFollowSuccess)
}


export default usersReducer