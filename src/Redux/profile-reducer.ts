import {v1} from "uuid";
import {actionsType, addPostActionType, postsType, profilePageType, updateNewPostTextType} from "./redux-store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


const initialState: profilePageType = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action: actionsType): profilePageType => {

    switch (action.type) {
        case ADD_POST:
            const newPost: postsType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return state
    }
}
export const addPostAC = (newPostText: string): addPostActionType => {
    return {type: "ADD-POST", newPostText}
}
export const updateNewPostAC = (text: string): updateNewPostTextType => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export type addPostACType = ReturnType<typeof addPostAC>;

export default profileReducer