import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import profileReducer, {addPostACType, deletePostACType, savePhotoSuccessACType, setStatusAC} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer, {
    followActionType, followingInProgressType,
    setCurrentPageType,
    setIsFetchingType,
    setUsersActionType,
    setUsersTotalCountType,
    UnFollowActionType
} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer, setInitializedSuccessAction} from "./app-reducer";

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
    followingInProgressType |
    ReturnType<typeof setStatusAC> |
    setInitializedSuccessAction |
    deletePostACType |
    savePhotoSuccessACType

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

export type messagesType = {
    id: string
    message: string
}
export type dialogsType = {
    id: string
    name: string
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
    form: formReducer,
    app: appReducer
})

export type rootStateType = ReturnType<typeof reducers>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(reducers, applyMiddleware(thunk))

//@ts-ignore
window.__store__ = store.getState()
export default store
