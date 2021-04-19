import {combineReducers, createStore, applyMiddleware, compose, Action} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./app-reducer";
import usersReducer from "./users-reducer";


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

export type RootStateType = ReturnType<typeof reducers>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>
//@ts-ignore
window.__store__ = store.getState()
export default store
