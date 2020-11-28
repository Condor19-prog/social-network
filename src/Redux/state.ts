import {v1} from "uuid";

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
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: () => void) => void
    getState: () => rootStateType
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
    getState() {
        return this._state
    },
    renderEntireTree() {
        console.log('123')
    },
    addPost() {
        const newPost: postsType = {
            id: v1(),
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this.renderEntireTree(this._state)
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this.renderEntireTree(this._state)
    },
    subscribe(observer) {
        this.renderEntireTree = observer
    }
}

export default store


