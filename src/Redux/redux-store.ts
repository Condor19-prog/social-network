import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import profileReducer, {addPostACType, deletePostACType, savePhotoSuccessACType, setStatusAC} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {authReducer, getCaptchaUrlSuccess} from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer, setInitializedSuccessAction} from "./app-reducer";
import usersReducer from "./users-reducer";

export type actionsType =
    addPostActionType |
    updateNewPostTextType |
    sendMessageType |
    addPostACType |

    setUserProfileType |
    setUserDataType |
    ReturnType<typeof setStatusAC> |
    setInitializedSuccessAction |
    deletePostACType |
    savePhotoSuccessACType |
    ReturnType<typeof getCaptchaUrlSuccess>

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

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// let store = createStore(reducers, applyMiddleware(thunk))

//@ts-ignore
window.__store__ = store.getState()
export default store
