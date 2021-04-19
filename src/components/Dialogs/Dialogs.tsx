import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageForm, {addMessageFormType} from "./AddMessagesForm/AddMessagesForm";
import {dialogPageType} from "../../Redux/redux-store";


type dialogsPropsType = {
    dialogsPage: dialogPageType
    sendMessage: (values: any) => void
    isAuth: boolean
}

function Dialogs(props: dialogsPropsType) {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    const messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    const addNewMessage = (values: addMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    )
}

export default Dialogs