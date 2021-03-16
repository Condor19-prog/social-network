import {v1} from "uuid";
import {
    actionsType,
    addPostActionType,
    setUserProfileType,
} from "./redux-store";
import {Dispatch} from "redux";
import {ProfileAPI, usersAPI} from "../api/api";
import {postsType, profilePageType, profileType} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

const initialState: profilePageType = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    profile: null as profileType | null,
    status: 'Hi! i am React JS Junior developer and I am looking for a job'
}

const profileReducer = (state = initialState, action: actionsType): profilePageType => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: postsType = {
                id: v1(),
                message: action.newPostText,
                likesCount: 0
            }
            if (action.newPostText === '') {
                alert('введи что нить')
                return state
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}
export const addPostAC = (newPostText: string): addPostActionType => {
    return {type: "ADD-POST", newPostText}
}
export const setStatusAC = (status: string) => {
    return ({type: SET_STATUS, status} as const)
}

export const setUserProfile = (profile: null): setUserProfileType => ({type: SET_USER_PROFILE, profile})

export const getUserProfile = (userId: number) =>
    (dispatch: Dispatch) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }

export const getStatusTC = (userId: number) =>
    (dispatch: Dispatch) => {
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatusAC(response.data))
        })
    }
export const updateStatusTC = (status: string) =>
    (dispatch: Dispatch) => {
        ProfileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0)
                dispatch(setStatusAC(status))
        })
    }

export type addPostACType = ReturnType<typeof addPostAC>;

export default profileReducer