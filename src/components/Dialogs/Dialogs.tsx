import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItemsType = {
    id: string
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
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem id='1' name='Dimych'/>
                <DialogItem id='2' name='Sveta'/>
            </div>
            <div className={s.messages}>
                <Message message='Yo'/>
                <Message message='Hello'/>
            </div>
        </div>
    )
}

export default Dialogs