import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type profileType = {
    profile: any
    status: string
    updateStatusTC: (status: string) => void
}

function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusTC={props.updateStatusTC}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile