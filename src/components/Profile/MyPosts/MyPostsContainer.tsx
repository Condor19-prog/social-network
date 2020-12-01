import React from "react";
import {actionsType, postsType} from "../../../Redux/store";
import {addPostAC, updateNewPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";

type MyPostsContainerType = {
    store: any
    dispatch: (action: actionsType) => void
    posts: Array<postsType>
    newPostText: string
}


function MyPostsContainer(props: MyPostsContainerType) {
    let state = props.store.getState()
    const addPost = () => {
        props.store.dispatch(addPostAC())
    }
    const onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostAC(text))
    }

    return <MyPosts
        addPost={addPost}
        updateNewPostText={onPostChange}
        posts={state.profilePage.posts}
        newPostText={state.profilePage.newPostText}
        dispatch={props.dispatch}
    />
}


export default MyPostsContainer