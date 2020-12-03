import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";



const reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer
})

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers)

export default store