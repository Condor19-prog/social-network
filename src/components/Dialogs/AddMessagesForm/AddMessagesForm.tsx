import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "../Dialogs.module.css";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validator";

export type addMessageFormType = {
    newMessageBody: string
}
const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<addMessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   validate={[requiredField, maxLength50]}
                   name='newMessageBody'
                   placeholder='Enter your message'/>
            <div>
                <button className={s.send}>send</button>
            </div>
        </form>
    )
}
export default reduxForm<addMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)