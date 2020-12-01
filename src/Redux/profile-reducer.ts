import {actionsType, addPostActionType, postsType, updateNewPostText} from "./store";
import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
    posts: [
        {id: v1(), message: 'Bonjour', likesCount: 12},
        {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action: actionsType) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: postsType = {
                id: v1(),
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}
export const addPostAC = (): addPostActionType => ({type: ADD_POST})
export const updateNewPostAC = (text: string): updateNewPostText => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}
export default profileReducer