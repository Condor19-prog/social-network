import {Dispatch} from "react";
import {addPostAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {actionsType, RootState} from "../../../Redux/redux-store";


const mapStateToProps = (state: RootState) => {

    return {
        posts: state.profilePage.posts,
    }
}
const mapDispatchToProps = (dispatch: Dispatch<actionsType> ) => {
    return {
        addPost: (values: string) => {
            dispatch(addPostAC(values))
        }
    }
}

const MyPostsContainer = connect<any,any,any,any >(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer