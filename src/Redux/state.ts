import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export type actionsType = addPostActionType | updateNewPostText

type addPostActionType = {
    type: 'ADD-POST'
}
type updateNewPostText = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type postsType = {
    id: string
    message: string
    likesCount: number
}
type messagesType = {
    id: string
    message: string
}
type dialogsType = {
    id: string
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
export type storeType = {
    _state: rootStateType
    renderEntireTree: (_state: rootStateType) => void
    subscribe: (observer: () => void) => void
    getState: () => rootStateType
    dispatch: (action: actionsType) => void
}

let store: storeType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: 'Bonjour', likesCount: 12},
                {id: v1(), message: 'Когда вернешь долг?', likesCount: 100000}
            ],
            newPostText: ''
        },
        dialogPage: {
            messages: [
                {id: v1(), message: 'Bonjour'},
                {id: v1(), message: 'Hello'},
                {id: v1(), message: 'Привет'},
                {id: v1(), message: 'Heil'},
            ],
            dialogs: [
                {id: v1(), name: 'Dimych'},
                {id: v1(), name: 'Sveta'},
                {id: v1(), name: 'Artem'},
                {id: v1(), name: 'Ivan'},
            ]
        }
    },
    renderEntireTree() {
        console.log('123')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this.renderEntireTree = observer
    },

    dispatch(action) {
        switch (action.type) {
            case ADD_POST:
                const newPost: postsType = {
                    id: v1(),
                    message: store._state.profilePage.newPostText,
                    likesCount: 0
                }
                this._state.profilePage.posts.push(newPost)
                this._state.profilePage.newPostText = ''
                this.renderEntireTree(this._state)
                break;
            case UPDATE_NEW_POST_TEXT:
                this._state.profilePage.newPostText = action.newText
                this.renderEntireTree(this._state)
                break;
        }
    }

}
export const addPostAC = (): addPostActionType => ({type: "ADD-POST"})
export const updateNewPostAC = (text: string): updateNewPostText => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: text
    }
}

export default store


