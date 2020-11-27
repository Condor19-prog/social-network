import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType, updateNewPostText} from "../../Redux/state";

type profileType = {
    posts: profilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
    newPostText: string
}


function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost} updateNewPostText={updateNewPostText} newPostText={props.newPostText}/>
        </div>
    )
}

export default Profile