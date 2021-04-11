import React from 'react';
import {Route} from 'react-router-dom';
import s from './App.module.css'
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeAppTC} from "./Redux/app-reducer";
import {rootStateType} from "./Redux/redux-store";
import Preloader from "./components/Common/Preloader/Preloader";
import {WithSuspense} from "./hok/WithSuspense";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

type appType = {
    initialized: boolean
}

class App extends React.Component<appType> {

    componentDidMount() {
        // @ts-ignore
        this.props.initializeAppTC()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={s.appWrapper}>
                <HeaderContainer/>
                <Navbar/>
                <div className={s.appWrapperContent}>

                    {/*@ts-ignore*/}
                    <Route exact path='/Profile/:userId?' render={WithSuspense(ProfileContainer)}/>
                    {/*@ts-ignore*/}
                    <Route path='/Dialogs' render={WithSuspense(DialogsContainer)}/>
                    <Route path='/Users' render={() => <UsersContainer/>}/>
                    <Route path='/Login' render={() => WithSuspense(Login)}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: rootStateType) => ({
    initialized: state.app.initialized
})
export default compose<any>(
    withRouter, connect(mapStateToProps, {initializeAppTC}))(App)
