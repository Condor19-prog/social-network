import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {RootState} from "../../Redux/redux-store";
import {withRouter} from "react-router";

type mapStateToProps = {
    profile: any
}
type mapDispatchToProps = {
    setUserProfile: (profile: any) => void
}

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                    this.props.setUserProfile(response.data)
                }
            )
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile
})
let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect<mapStateToProps, mapDispatchToProps, {}, RootState>(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)