import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/photo/user-male.png';
import {Form} from "redux-form";
import {ProfileDataForm} from "./ProfileDataForm";

type profileInfoType = {
    profile: any
    status: string
    isOwner: boolean
    savePhoto: any
}

function ProfileInfo(props: profileInfoType) {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.discriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt="profile" className={s.namePhoto}/><br/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelect}/>}
                {
                    editMode ? <ProfileDataForm profile={props.profile}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner}
                                 goToEditMode={() => setEditMode(true)}/>
                }

                <ProfileStatusWithHooks status={props.status}/>
            </div>
        </div>
    )
}

type profileDataType = {
    profile: any
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = (props: profileDataType) => {
    const {profile} = props
    return (
        <div>
            {props.isOwner &&
            <div>
                <button onClick={props.goToEditMode}>Edit</button>
            </div>}
            <div><b>Full name:</b> {profile.fullName}</div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b>{props.profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

type contactsType = {
    contactTitle: any
    contactValue: any
}
const Contacts = (props: contactsType) => {
    return (
        <div style={{marginLeft: '20px'}}>
            <b>{props.contactTitle}</b>: <b>{props.contactValue}</b>
        </div>
    )
}

export default ProfileInfo