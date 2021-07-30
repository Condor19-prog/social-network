import React, {ChangeEvent, useEffect, useRef, useState, UIEvent} from "react";
import {Avatar, Button, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {RootStateType} from "../../Redux/redux-store";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: RootStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div style={{maxWidth: '50vh'}}>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = React.memo(() => {
    const messages = useSelector((state: RootStateType) => state.chat.messages)
    const [autoscroll, setAutoscroll] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !autoscroll && setAutoscroll(true)
        } else {
            autoscroll && setAutoscroll(false)
        }
    }

    useEffect(() => {
        if (autoscroll) {
            messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);

    return (
        <div style={{height: 400, overflowY: 'auto', marginBottom: 20, backgroundColor: 'white'}}
             onScroll={scrollHandler}>
            {messages.map((m, i) => <Message key={i} message={m}/>)}
            <div ref={messagesEndRef}/>
        </div>
    )
})

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div style={{display: 'flex', marginLeft: 10}}>
            <Avatar src={message.photo}/>
            <div style={{marginLeft: 10}}>
                <div>
                    <b>{message.userName}</b>
                </div>
                <span>{message.message}</span>
            </div>
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: RootStateType) => state.chat.status)
    const [message, setMessage] = useState('')


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)

    return (
        <div>
            <Input style={{maxWidth: '40vh', marginRight: 5}} value={message} onChange={onChangeHandler}/>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
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