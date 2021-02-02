import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {RootState} from "../../Redux/redux-store";

type mapStateToProps = {
    profile: any
}
type mapDispatchToProps = {
    setUserProfile: (profile: number) => void
}


class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/2`)
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
export default connect<mapStateToProps, mapDispatchToProps, {}, RootState>(mapStateToProps, {setUserProfile})(ProfileContainer)