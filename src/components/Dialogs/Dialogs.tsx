import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {actionsType, dialogPageType} from "../../Redux/state";
import {sendMessageAC, UpdateNewMessageBodyAC} from "../../Redux/dialogs-reducer";

type dialogsPropsType = {
    dialogsAndMessages: dialogPageType
    dispatch: (action: actionsType) => void
}

function Dialogs(props: dialogsPropsType) {

    const dialogsElements = props.dialogsAndMessages.dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    const messagesElements = props.dialogsAndMessages.messages.map(m => <Message message={m.message} key={m.id}/>)
    const newMessageBody = props.dialogsAndMessages.newMessageBody

    const onSendMessageClick = () => {
        props.dispatch(sendMessageAC())
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMessageBody = e.currentTarget.value
        props.dispatch(UpdateNewMessageBodyAC(newMessageBody))
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