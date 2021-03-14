import {actionsType, setUserDataType} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as null | string,
    isAuth: false
}
export type initialStateType = typeof initialState
export const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: null | string, isAuth: boolean): setUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {login, id, email} = response.data.data
                dispatch(setAuthUserDataAC(id, email, login, true))
            }
        })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    debugger
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataTC())
            }
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}