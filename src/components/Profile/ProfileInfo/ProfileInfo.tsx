import React, {ChangeEvent} from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/photo/user-male.png';

type profileInfoType = {
    profile: any
    status: string
    isOwner: boolean
    savePhoto: any
}

function ProfileInfo(props: profileInfoType) {

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
                <ProfileStatusWithHooks status={props.status}/>
            </div>
        </div>
    )
}

export default ProfileInfo