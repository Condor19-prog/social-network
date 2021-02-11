import {actionsType, setUserDataType} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
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
export const setAuthUserDataAC = (userId: number, email: string, login: string): setUserDataType => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
} as const)