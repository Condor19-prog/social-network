import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {actionsType, dialogPageType} from "../../Redux/store";
import {sendMessageAC, UpdateNewMessageBodyAC} from "../../Redux/dialogs-reducer";

type dialogsPropsType = {
    dialogsPage: dialogPageType
    sendMessage: () => void
    UpdateNewMessageBody: (newMessageBody: string) => void
}

function Dialogs(props: dialogsPropsType) {

    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)
    const newMessageBody = props.dialogsPage.newMessageBody

    const onSendMessageClick = () => {
        props.sendMessage()
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMessageBody = e.currentTarget.value
        props.UpdateNewMessageBody(newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea
                    className={s.textarea}
                    placeholder='Enter yor message'
                    value={newMessageBody}
                    onChange={onNewMessageChange}
                />
                <div>
                    <button className={s.send} onClick={onSendMessageClick}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs