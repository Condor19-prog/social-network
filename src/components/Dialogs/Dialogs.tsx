import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";


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