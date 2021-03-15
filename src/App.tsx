import React from 'react';
import {Route} from 'react-router-dom';
import s from './App.module.css'
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {initializeAppTC} from "./Redux/app-reducer";
import {RootState} from "./Redux/redux-store";
import Preloader from "./components/Common/Preloader/Preloader";

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
                    <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                    {/*@ts-ignore*/}
                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/Users' render={() => <UsersContainer/>}/>
                    <Route path='/Login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.initialized
})
export default compose<any>(
    withRouter, connect(mapStateToProps, {initializeAppTC}))(App)
