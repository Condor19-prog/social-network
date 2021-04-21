import {v1} from "uuid";
import { InferActionsTypes} from "./redux-store";


export type ActionsType = InferActionsTypes<typeof action>
export type InitialStateType = typeof initialState
const initialState = {
    messages: [
        {id: v1(), message: 'Bonjour'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'Привет'},
        {id: v1(), message: 'Heil'},
    ],
    dialogs: [
        {id: v1(), name: 'Dimych'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Artem'},
        {id: v1(), name: 'Ivan'},
    ],
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'DIALOGS/SEND-MESSAGE':
            const body = action.newMessageBody
            if (body) {
                return {
                    ...state,
                    messages: [...state.messages, {id: v1(), message: body}],
                    dialogs: [...state.dialogs, {id: v1(), name: 'IT-incubator'}]
                }
            } else {
                alert('введите сообщение')
            }
            return state
        default:
            return state
    }
}

export const action = {
    sendMessage: (newMessageBody: string) => ({type: 'DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}
export default dialogsReducer