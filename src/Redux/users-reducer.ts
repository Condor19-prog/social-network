import {InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {UserType} from "../types/types";
import {updateObjectInArray} from "../utils/objectHelpers";
import {usersAPI} from "../api/usersAPI";
import {ResultCodesEnum} from "../api/api";

type ActionType = InferActionsTypes<typeof action>
type initialStateType = typeof initialState

const initialState = {
    users: [] as UserType[],
    pageSize: 10,  //кол-во юзеров на странице
    totalUsersCount: 0,  //кол-во юзеров всего
    currentPage: 1, //текущая страница
    isFetching: false,
    followingInProgress: [] as Array<number>
}


export const usersReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "FOLLOW": {
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
        case "UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                //     state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
            }
        }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_USERS_TOTAL_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    [state.followingInProgress.filter(id => id !== action.userId)]
            } as initialStateType
        }
        default:
            return state
    }
}
export const action = {
    followSuccess: (userId: number) => {
        return ({type: 'FOLLOW', userId} as const)
    },
    unFollowSuccess: (userId: number) => {
        return ({type: 'UNFOLLOW', userId} as const)
    },
    setUsers: (users: Array<UserType>) => {
        return ({type: 'SET_USERS', users} as const)
    },
    setCurrentPage: (currentPage: number) => {
        return ({type: 'SET_CURRENT_PAGE', currentPage} as const)
    },
    setUsersTotalCount: (totalCount: number) => {
        return ({type: 'SET_USERS_TOTAL_COUNT', count: totalCount} as const)
    },
    toggleIsFetching: (isFetching: boolean) => {
        return ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
    },
    toggleInFollowingProgress: (isFetching: boolean, userId: number) => {
        return ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
    }
}

export const getUsersTC = (page: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(action.toggleIsFetching(true))
    dispatch(action.setCurrentPage(page))
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(action.toggleIsFetching(false))
    dispatch(action.setUsers(data.items))
    dispatch(action.setUsersTotalCount(data.totalCount))
}
const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<any>,
                                  actionCreator: (userId: number) => ActionType) => {

    dispatch(action.toggleInFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(action.toggleInFollowingProgress(false, userId))
}
export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.follow.bind(userId)
    await followUnfollowFlow(dispatch, userId, apiMethod, action.followSuccess)
}

export const unFollowTC = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(userId)
    await followUnfollowFlow(dispatch, userId, apiMethod, action.unFollowSuccess)
}


export default usersReducer