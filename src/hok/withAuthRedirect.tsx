import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type mapStateToPropsType = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: RootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    class RedirectComponent extends React.Component<mapStateToPropsType, any> {
        render() {
            let {isAuth, ...restProps} = this.props

            if (!isAuth) return <Redirect to={'/Login'}/>
            return <Component {...restProps as T}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}