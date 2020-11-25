import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../../Redux/state";


function Profile(props: profilePageType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
}

export default Profile