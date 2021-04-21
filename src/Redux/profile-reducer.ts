import {v1} from "uuid";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {PhotosType, postsType, ProfileType} from "../types/types";
import {FormAction, stopSubmit} from "redux-form";
import {ProfileAPI} from "../api/profileAPI";
import {ResultCodesEnum} from "../api/api";

type ThunkType = BaseThunkType<ActionsTypes | FormAction>
export type ActionsTypes = InferActionsTypes<typeof action>
type InitialStateType = typeof initialState

const initialState = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ] as postsType[],
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
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
        case 'SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
}
export const action = {
    addPost: (newPostText: string) => {
        return ({type: "ADD-POST", newPostText} as const)
    },
    deletePost: (postId: string) => {
        return ({type: "DELETE-POST", postId} as const)
    },
    setStatus: (status: string) => {
        return ({type: 'SET-STATUS', status} as const)
    },
    setUserProfile: (profile: ProfileType) => ({type: 'SET-USER-PROFILE', profile} as const),
    savePhotoSuccessAC: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
}
export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await ProfileAPI.getProfile(userId)
        dispatch(action.setUserProfile(data))
    }

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId)
    dispatch(action.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(action.setStatus(status))
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(action.savePhotoSuccessAC(data.data.photos))
    } else if (data.resultCode === ResultCodesEnum.Error) {
        alert(data.messages[0])
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await ProfileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
        userId && dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer