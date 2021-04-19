import {Dispatch} from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/redux-store";
import {action, ActionsTypes} from "../../../Redux/profile-reducer";


const mapStateToProps = (state: RootStateType) => {

    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActionsTypes> ) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(action.addPostAC(newPostText))
        }
    }
}

const MyPostsContainer = connect<any,any,any,any >(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer