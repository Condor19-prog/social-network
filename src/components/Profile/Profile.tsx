import React from "react";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {actionsType, profilePageType} from "../../Redux/state";

type profileType = {
    posts: profilePageType
    dispatch: (action: actionsType) => void
}


function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts profilePageType={props.posts} dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile