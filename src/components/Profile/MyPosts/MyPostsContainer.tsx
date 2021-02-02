import {Dispatch} from "react";
import {addPostAC, updateNewPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {actionsType, RootState} from "../../../Redux/redux-store";




const mapStateToProps = (state: RootState) => {

    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch<actionsType> ) => {

    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostAC(text))
        }
    }
}

const MyPostsContainer = connect<any,any,any,any >(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer