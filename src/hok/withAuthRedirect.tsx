import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {RootStateType} from "../Redux/redux-store";
import {connect} from "react-redux";

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToProps = {}
const mapStateToPropsForRedirect = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent: React.FC<MapStateToPropsType & MapDispatchToProps> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={'/Login'}/>
        return <Component {...restProps as T}/>
    };

    const ConnectedAuthRedirectComponent = connect<MapStateToPropsType, MapDispatchToProps, T, RootStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}