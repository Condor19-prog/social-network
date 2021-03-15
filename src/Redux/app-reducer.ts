import {actionsType} from "./redux-store";
import {getAuthUserDataTC} from "./auth-reducer";

export type setInitializedSuccessAction = ReturnType<typeof setInitializedSuccessAC>
const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'

const initialState = {
    initialized: false
}
type initialState = typeof initialState

export const appReducer = (state = initialState, action: actionsType): initialState => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export const setInitializedSuccessAC = () => ({type: SET_INITIALIZED_SUCCESS} as const)

export const initializeAppTC = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataTC())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedSuccessAC())
        })

}
