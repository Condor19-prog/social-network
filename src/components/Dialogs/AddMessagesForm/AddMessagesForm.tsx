import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../Dialogs.module.css";
import {createField, Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validator";
import {NewMessageFormType} from "../Dialogs";


type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {
                createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody',
                    Textarea, [requiredField, maxLength50], {type: 'text'})
            }
            <div>
                <button className={s.send}>send</button>
            </div>
        </form>
    )
}
export default reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm)