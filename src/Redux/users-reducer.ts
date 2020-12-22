import {actionsType} from "./redux-store";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
export type setUsersActionType = {
    type: 'SET-USERS'
    users: Array<userType>
}
export type followActionType = {
    type: 'FOLLOW'
    userId: string
}
export type UnFollowActionType = {
    type: 'UNFOLLOW'
    userId: string
}
export type setCurrentPageType = {
    type: 'SET-CURRENT-PAGE'
    pageNumber: number
}
export type setUsersTotalCount = {
    type: 'SET-USERS-TOTAL-COUNT'
    totalCount: number
}
export type userType = {
    id: string
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
    currentPage: 1
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
            return {...state, currentPage: action.pageNumber}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        default:
            return state
    }
}

export const followAC = (userId: string): followActionType => {
    return {type: FOLLOW, userId}
}
export const unFollowAC = (userId: string): UnFollowActionType => {
    return {type: UNFOLLOW, userId}
}
export const setUsersAC = (users: Array<userType>): setUsersActionType => {
    return {type: SET_USERS, users}
}
export const setCurrentPageAC = (pageNumber: number): setCurrentPageType => {
    return {type: SET_CURRENT_PAGE, pageNumber}
}
export const setUsersTotalCountAC = (totalCount: number): setUsersTotalCount => {
    return {type: SET_USERS_TOTAL_COUNT, totalCount}
}
export default usersReducer