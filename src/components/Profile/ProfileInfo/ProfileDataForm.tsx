import React from "react";
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../../Common/FormsControls/FormsControl.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

export const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
                                                                                                     handleSubmit,
                                                                                                     profile,
                                                                                                     error
                                                                                                 }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
                {error && <div className={s.formSummaryError}>Error</div>}
            </div>
            <div><b>Full name:</b>{createField('Full name', 'fullName', Input, [])}</div>
            <b>Looking for a job:</b> {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
            <div>
                <b>My professional skills:</b>
                {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div>
                <b>About me:</b> {createField<ProfileTypeKeys>('About me', 'aboutMe', Textarea, [])}
            </div>
            <div>
                <b>Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => {
                return <div key={key}>{key}: {createField(key, 'contacts.' + key, Input, [])}</div>
            })}
            </div>
        </form>
    )
}
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm