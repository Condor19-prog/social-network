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
        let userId: number = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfile(userId)
        this.props.getStatusTC(userId)
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
export default compose<any>(withAuthRedirect, connect(mapStateToProps, {
        setUserProfile,
        getUserProfile,
        getStatusTC,
    }),
    withRouter)(ProfileContainer)
