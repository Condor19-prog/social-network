import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemsType = {
    id: number
    name: string
}

function DialogItem(props: DialogItemsType) {
    const path = '/Dialogs/' + props.id

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

type MessageType = {
    message: string
}

function Message(props: MessageType) {
    return (
        <div className={s.message}>{props.message}</div>
    )
}


function Dialogs() {

    const dialogs = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Artem'},
        {id: 4, name: 'Ivan'},
    ]
    const messages = [
        {id: 1, message: 'Bonjour'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Привет'},
        {id: 4, message: 'Heil'},
    ]
    const dialogsElements = dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)
    const messagesElements = messages.map(m => <Message message={m.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs