import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusTC, getUserProfile, setUserProfile, updateStatusTC} from "../../Redux/profile-reducer";
import {rootStateType} from "../../Redux/redux-store";
import {withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hok/withAuthRedirect";

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        const {match, authorizedUserId, getStatusTC} = this.props
        let userId: number = match.params.userId
        if (!userId) {
            userId = authorizedUserId
        }
        getUserProfile(userId)
        getStatusTC(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: rootStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})
export default compose(withAuthRedirect, connect(mapStateToProps, {
        setUserProfile,
        getUserProfile,
        getStatusTC,
    }),
    withRouter)(ProfileContainer)
