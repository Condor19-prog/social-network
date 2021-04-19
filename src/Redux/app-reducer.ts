import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


const initialState = {
    initialized: false
}
type initialState = typeof initialState
type ActionsType = InferActionsTypes<typeof action>
type ThunkType = BaseThunkType<ActionsType>

export const appReducer = (state = initialState, action: ActionsType): initialState => {
    switch (action.type) {
        case 'APP/SET_INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}
export const action = {
    setInitializedSuccessAC: () => ({type: 'APP/SET_INITIALIZED_SUCCESS'} as const)
}


export const initializeAppTC = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    return Promise.all([promise])
        .then(() => {
            dispatch(action.setInitializedSuccessAC())
        })
}
