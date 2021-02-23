import {v1} from "uuid";
import {
    actionsType,
    addPostActionType,
    postsType,
    profilePageType,
    setUserProfileType,
    updateNewPostTextType
} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialState: profilePageType = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    newPostText: '',
    profile: null
}

const profileReducer = (state = initialState, action: actionsType): profilePageType => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: postsType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            if (state.newPostText === '') {
                alert('введи что нить')
                return state
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}
export const addPostAC = (): addPostActionType => {
    return {type: "ADD-POST"}
}
export const updateNewPostAC = (text: string): updateNewPostTextType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}
export const setUserProfile = (profile: null): setUserProfileType => ({type: SET_USER_PROFILE, profile})
export const getUserProfile = (userId: number) =>
    (dispatch: Dispatch) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }

export type addPostACType = ReturnType<typeof addPostAC>;

export default profileReducer