import React from "react";
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {RootStateType} from "../../Redux/redux-store";

class HeaderContainer extends React.Component<DispatchPropsType & MapPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})


export default connect<MapPropsType, DispatchPropsType, {}, RootStateType>(mapStateToProps, {logOut})(HeaderContainer)