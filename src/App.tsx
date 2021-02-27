import React from 'react';
import {Route} from 'react-router-dom';
import s from './App.module.css'
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";


function App() {
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

export default App;
