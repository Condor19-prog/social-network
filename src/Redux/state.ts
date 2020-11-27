import {renderEntireTree} from "../render";

export type postsType = {
    id: number
    message: string
    likesCount: number
}
type messagesType = {
    id: number
    message: string
}
type dialogsType = {
    id: number
    name: string
}
export type profilePageType = {
    posts: Array<postsType>
    newPostText: string
}
export type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}
export type rootStateType = {
    profilePage: profilePageType
    dialogPage: dialogPageType
}

export const state: rootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Bonjour', likesCount: 12},
            {id: 2, message: 'Когда вернешь долг?', likesCount: 100000}
        ],
        newPostText: ''
    },
    dialogPage: {
        messages: [
            {id: 1, message: 'Bonjour'},
            {id: 2, message: 'Hello'},
            {id: 3, message: 'Привет'},
            {id: 4, message: 'Heil'},
        ],
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Sveta'},
            {id: 3, name: 'Artem'},
            {id: 4, name: 'Ivan'},
        ]
    }
}

export const addPost = () => {
    const newPost: postsType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    renderEntireTree(state)
}
export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    renderEntireTree(state)
}