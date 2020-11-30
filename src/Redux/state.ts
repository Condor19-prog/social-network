import {v1} from "uuid";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export type actionsType = addPostActionType | updateNewPostText | updateNewMessageBodyType | sendMessageType
type sendMessageType = {
    type: 'SEND-MESSAGE'
}
type updateNewMessageBodyType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    messageBody: string
}
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
export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
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
    newMessageBody: string
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

export const store: storeType = {
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
            ],
            newMessageBody: ''
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
            case UPDATE_NEW_MESSAGE_BODY:
                this._state.dialogPage.newMessageBody = action.messageBody
                this.renderEntireTree(this._state)
                break
            case SEND_MESSAGE:
                debugger
                const body = this._state.dialogPage.newMessageBody
                this._state.dialogPage.newMessageBody = ''
                this._state.dialogPage.messages.push({id: v1(), message: body})
                this.renderEntireTree(this._state)
        }
    }
}
export const addPostAC = (): addPostActionType => ({type: ADD_POST})
export const updateNewPostAC = (text: string): updateNewPostText => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}
export const UpdateNewMessageBodyAC = (newMessageBody: string): updateNewMessageBodyType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        messageBody: newMessageBody
    }
}
export const sendMessageAC = (): sendMessageType => ({type: SEND_MESSAGE})

export default store


