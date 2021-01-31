import {combineReducers, createStore} from "redux";
import profileReducer, {addPostACType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer, {
    followActionType,
    setCurrentPageType,
    setIsFetchingType,
    setUsersActionType,
    setUsersTotalCount,
    UnFollowActionType
} from "./users-reducer";

export type actionsType =
    addPostActionType |
    updateNewPostTextType |
    updateNewMessageBodyType |
    sendMessageType |
    addPostACType |
    followActionType |
    UnFollowActionType |
    setUsersActionType |
    setCurrentPageType |
    setUsersTotalCount |
    setIsFetchingType


export type sendMessageType = {
    type: 'SEND-MESSAGE'
}
export type updateNewMessageBodyType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    messageBody: string
}
export type addPostActionType = {
    type: 'ADD-POST'

}
export type updateNewPostTextType = {
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


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer
})

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers)

export default store