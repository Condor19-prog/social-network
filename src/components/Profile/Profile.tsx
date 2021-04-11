import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type profileType = {
    profile: any
    status: string
    isOwner: boolean
    savePhoto: any
}

function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} isOwner={props.isOwner} savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile