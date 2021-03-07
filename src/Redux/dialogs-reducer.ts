import {v1} from "uuid";
import {actionsType, dialogPageType, sendMessageType} from "./redux-store";


const SEND_MESSAGE = 'SEND-MESSAGE'
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

const dialogsReducer = (state = initialState, action: actionsType): dialogPageType => {

    switch (action.type) {
        case SEND_MESSAGE:
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

export const sendMessageAC = (newMessageBody: string): sendMessageType => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReducer