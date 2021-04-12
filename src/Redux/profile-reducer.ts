import {v1} from "uuid";
import {
    actionsType,
    addPostActionType,
    setUserProfileType,
} from "./redux-store";
import {Dispatch} from "redux";
import {ProfileAPI, usersAPI} from "../api/api";
import {photosType, postsType, profilePageType, profileType} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

const initialState: profilePageType = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    profile: {
        photos: {}
    },
    status: 'Hi! i am React JS Junior developer and I am looking for a job',
    // contacts: {
    //     github: 'null',
    //     vk: 'null',
    //     facebook: 'null',
    //     instagram: 'null',
    //     twitter: 'null',
    //     website: 'null',
    //     youtube: 'null',
    //     mainLink: 'null',
    // }

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
        case "DELETE-POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS:{
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}
export const addPostAC = (newPostText: string): addPostActionType => {
    return {type: "ADD-POST", newPostText}
}
export const deletePostAC = (postId: string) => {
    return ({type: "DELETE-POST", postId} as const)
}
export const setStatusAC = (status: string) => {
    return ({type: SET_STATUS, status} as const)
}

export const setUserProfile = (profile: null): setUserProfileType => ({type: SET_USER_PROFILE, profile})
export const savePhotoSuccessAC = (photos: any) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatusAC(response.data))
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatusAC(status))
}
export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccessAC(response.data.data.photos))
}


export type addPostACType = ReturnType<typeof addPostAC>;
export type deletePostACType = ReturnType<typeof deletePostAC>;
export type savePhotoSuccessACType = ReturnType<typeof savePhotoSuccessAC>

export default profileReducer