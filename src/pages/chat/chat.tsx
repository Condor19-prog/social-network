import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {findAllByDisplayValue} from "@testing-library/react";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log('close ws')
            createChanel()
        }

        const createChanel = () => {

            ws?.removeEventListener("close", closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const messagesEndRef = useRef<any>(null)

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [messages, wsChannel])

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({behavior: "auto"})
    }, [messages]);

    return (
        <div style={{height: 400, overflowY: 'auto', marginBottom: 20}}>
            {
                messages.map((m, index) => <Message key={index} message={m}/>)
            }
            <div ref={messagesEndRef}/>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <Avatar src={message.photo}/> <b>{message.userName}</b>
            <br/>
            {message.message}
        </div>
    )
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>()

    useEffect(() => {
            const openHandler = () => {
                setReadyStatus('ready')
            }
            wsChannel?.addEventListener('open', openHandler)

            return () => {
                wsChannel?.removeEventListener('open', openHandler)
            }
        }, [wsChannel]
    )

    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    }
debugger
    return (
        <div>
            <Input style={{maxWidth: '40vh', marginRight: 5}} value={message}
                   onChange={(e) => setMessage(e.currentTarget.value)}/>
            <Button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</Button>
        </div>

    )
}

export default ChatPage

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}