import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataTC, logOutTC} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component<any> {
    componentDidMount() {
        this.props.getAuthUserDataTC()
    }

    render() {
        return <Header {...this.props}
                       isAuth={this.props.isAuth}
                       login={this.props.login}
        />
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})


export default connect(mapStateToProps, {getAuthUserDataTC, logOutTC})(HeaderContainer)