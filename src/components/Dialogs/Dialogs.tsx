import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {dialogPageType} from "../../Redux/redux-store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


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
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

type addMessageFormType = {
    newMessageBody: string
}

const addMessageForm: React.FC<InjectedFormProps<addMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component='textarea' name='newMessageBody' placeholder='Enter your message'/>
            <div>
                <button className={s.send}>send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm<addMessageFormType>({form: 'dialogAddMessageForm'})(addMessageForm)
export default Dialogs