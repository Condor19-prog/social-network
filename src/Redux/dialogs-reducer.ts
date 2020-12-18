import {v1} from "uuid";
import {actionsType, dialogPageType, sendMessageType, updateNewMessageBodyType} from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
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
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action: actionsType): dialogPageType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.messageBody
            }

        case SEND_MESSAGE:
            const body = state.newMessageBody
            if (state.newMessageBody) {
                return {
                    ...state,
                    newMessageBody: '',
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
export const UpdateNewMessageBodyAC = (newMessageBody: string): updateNewMessageBodyType => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        messageBody: newMessageBody
    }
}
export const sendMessageAC = (): sendMessageType => ({type: SEND_MESSAGE})
export default dialogsReducer