import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { dialogPageType } from "../../Redux/state";


function Dialogs(props: dialogPageType) {

    const dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    const messagesElements = props.messages.map(m => <Message message={m.message} key={m.id}/>)

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