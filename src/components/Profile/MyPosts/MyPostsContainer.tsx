import React from "react";
import {profilePageType} from "../../../Redux/store";
import {addPostAC, updateNewPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../Redux/redux-store";

type mapDispatchToPropsType = {
    addPost: () => void
    updateNewPostText: (text: string) => void
}

const mapStateToProps = (state: RootState) => {

    return {
        posts: state.profilePage.posts,
        newPostTex: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostAC(text))
        }
    }
}
const MyPostsContainer = connect<any,any,any,any>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer