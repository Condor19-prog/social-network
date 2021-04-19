import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {ResultCodesEnum} from "../api/api";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as null | string,
    isAuth: false,
    captcha: null as string | null
}
type ActionType = InferActionsTypes<typeof action>
export type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionType | FormAction>

export const authReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case "auth/GET_CAPTCHA_URL_SUCCESS": {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}
const action = {
    setAuthUserData: (userId: number | null, email: string | null, login: null | string, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captcha: string) => ({type: "auth/GET_CAPTCHA_URL_SUCCESS", payload: {captcha}} as const)
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {login, id, email} = data.data
        dispatch(action.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {

    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {email: message}))
    }
}
export const logOut = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logOut()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(action.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha()
    const captchaUrl = data.url
    dispatch(action.getCaptchaUrlSuccess(captchaUrl))
}