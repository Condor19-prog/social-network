import {actionsType, setUserDataType} from "./redux-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null,
    email: null,
    login: null as null | string,
    isAuth: false
}
export const authReducer = (state = initialState, action: actionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state
    }
}
export const setAuthUserDataAC = (userId: number, email: string, login: null | string): setUserDataType => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
} as const)
export const getAuthUserDataTC = () =>
    (dispatch: Dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {login, id, email} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            })
    }