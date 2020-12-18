import React from 'react';
import {Route} from 'react-router-dom';
import s from './App.module.css'
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";



function App() {
    return (
        <div className={s.appWrapper}>
            <Header/>
            <Navbar/>
            <div className={s.appWrapperContent}>
                <Route path='/Profile' render={() => <Profile/>}/>
                <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                <Route path='/Users' render={() => <UsersContainer/>}/>
            </div>
        </div>
    );
}

export default App;
