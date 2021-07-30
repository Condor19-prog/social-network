import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageApiType, ChatMessageType, StatusType} from "../api/chat-API";
import {Dispatch} from "redux";
import {v1} from "uuid";


const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}
type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof action>
type ThunkType = BaseThunkType<ActionsType>

export const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, i, arr) => arr.length - 100)
            }
        }
        case 'SN/chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state
    }
}
export const action = {
    messagesReceived: (messages: ChatMessageApiType[]) => ({
        type: 'SN/chat/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/chat/STATUS_CHANGED',
        payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => dispatch(action.messagesReceived(messages))
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => dispatch(action.statusChanged(status))
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
