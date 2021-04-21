import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/photo/user-male.png';
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {contactsType, ProfileType} from "../../../types/types";


type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         profile,
                                                         status,
                                                         isOwner,
                                                         savePhoto,
                                                         saveProfile,
                                                         updateStatus
                                                     }) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {

        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }
    return (
        <div>
            <div className={s.discriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="profile" className={s.namePhoto}/><br/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelect}/>}
                {
                    editMode ?
                        <ProfileDataFormReduxForm initialValues={profile}
                                                  profile={profile}
                                                  onSubmit={onSubmit}/>
                        : <ProfileData profile={profile}
                                       isOwner={isOwner}
                                       goToEditMode={() => setEditMode(true)}/>
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataType> = ({profile,isOwner,goToEditMode}) => {


    return (
        <div>
            {isOwner &&
            <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div><b>Full name:</b> {profile.fullName}</div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b>{profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object
                .keys(profile.contacts)
                .map(key => {
                return <Contacts key={key} contactTitle={key}
                                 contactValue={profile.contacts[key as keyof contactsType]}/>
            })}
            </div>
        </div>
    )
}

type contactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contacts = (props: contactsPropsType) => {
    return (
        <div style={{marginLeft: '20px'}}>
            <b>{props.contactTitle}</b>: <b>{props.contactValue}</b>
        </div>
    )
}

export default ProfileInfo