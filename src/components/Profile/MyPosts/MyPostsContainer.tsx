import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/redux-store";
import {action} from "../../../Redux/profile-reducer";


const mapStateToProps = (state: RootStateType) => {

    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, RootStateType>(mapStateToProps,
    {
        addPost: action.addPost
    })(MyPosts)

export default MyPostsContainer