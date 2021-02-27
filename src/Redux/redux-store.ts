import {combineReducers, createStore, applyMiddleware} from "redux";
import profileReducer, {addPostACType, setStatusAC} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer, {
    followActionType, followingIsProgressType,
    setCurrentPageType,
    setIsFetchingType,
    setUsersActionType,
    setUsersTotalCountType,
    UnFollowActionType
} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";

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
    setUsersTotalCountType |
    setIsFetchingType |
    setUserProfileType |
    setUserDataType |
    followingIsProgressType |
    ReturnType<typeof setStatusAC>

export type setUserDataType = {
    type: 'SET_USER_DATA'
    data: {
        userId: number
        email: string
        login: string | null
    }
}
export type setUserProfileType = {
    type: 'SET-USER-PROFILE'
    profile: any
}
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
    profile: any
    status: string
}
export type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
    newMessageBody: string
}

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunk))

export default store