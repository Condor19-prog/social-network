let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null

type EventsName = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('RESTART PAGE')
}

const clanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

const createChanel = () => {
    clanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        clanUp()
        ws?.close()
    },
    subscribe(eventName: EventsName, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsName, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type ChatMessageType = ChatMessageApiType & { id: string }
type MessagesReceivedSubscriberType = (message: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error';