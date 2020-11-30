import store, {actionsType, addPostActionType, postsType, profilePageType, updateNewPostText} from "./state";
import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state: profilePageType, action: actionsType) => {
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