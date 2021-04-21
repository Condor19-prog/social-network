import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import AddMessageForm from "./AddMessagesForm/AddMessagesForm";
import {InitialStateType} from "../../Redux/dialogs-reducer";


type DialogsPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}
export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, sendMessage}) => {
    const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} key={d.id}/>)
    const messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    const addNewMessage = (values: NewMessageFormType) => {
        sendMessage(values.newMessageBody)
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
};

export default Dialogs