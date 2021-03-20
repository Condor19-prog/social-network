import React from "react";
import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


type profileInfoType = {
    profile: any
    status: string
}

function ProfileInfo(props: profileInfoType) {

    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                {/*<img src="https://i.ytimg.com/vi/xX5vNmZMLNk/hqdefault.jpg" alt="content"/>*/}
            </div>
            <div className={s.discriptionBlock}>
                <img src={props.profile.photos.large} alt="profile"/>
                <ProfileStatusWithHooks status={props.status}/>
            </div>
        </div>
    )
}

export default ProfileInfo