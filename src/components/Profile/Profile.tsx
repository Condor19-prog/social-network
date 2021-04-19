import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type profilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

function Profile(props: profilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile