import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profilePageType} from "../../Redux/redux-store";

type profileType = {
    profile: profilePageType | null
}

function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile