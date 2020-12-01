import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {actionsType, profilePageType, storeType} from "../../Redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type profileType = {
    store: storeType
    profilePage: profilePageType
    dispatch: (action: actionsType) => void
}


function Profile(props: profileType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer
                store={props.store}
                posts={props.profilePage.posts}
                dispatch={props.dispatch}
                newPostText={props.profilePage.newPostText}/>
        </div>
    )
}

export default Profile