import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type profileType = {
    profile: any
    status: string
}

function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile