import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../../utils/validators/validator";
import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../../Common/FormsControls/FormsControls";
import {LoginFormValuesType} from "../../../Login/Login";

const maxLength10 = maxLengthCreator(10)
export type AddNewPostFormType = {
    newPostText: string
}
type AddFormForValuesTypesKeys = GetStringKeys<AddNewPostFormType>

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                {createField<AddFormForValuesTypesKeys>('Your post', 'newPostText', Textarea,
                    [requiredField, maxLength10], {type: 'text'})}
                <div>
                    <button>Add post</button>
                </div>
            </form>

        </div>
    )
}
export const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form: 'AddNewPostForm'})(AddNewPostForm)