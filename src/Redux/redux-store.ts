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
import {reducer as formReducer} from 'redux-form'

export type actionsType =
    addPostActionType |
    updateNewPostTextType |
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
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export type setUserProfileType = {
    type: 'SET-USER-PROFILE'
    profile: any
}
export type sendMessageType = {
    type: 'SEND-MESSAGE'
    newMessageBody: any
}
export type addPostActionType = {
    type: 'ADD-POST'
    newPostText: string
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
    profile: any
    status: string
}
export type dialogPageType = {
    dialogs: Array<dialogsType>
    messages: Array<messagesType>
}

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunk))
//@ts-ignore
window.store = store
export default store
