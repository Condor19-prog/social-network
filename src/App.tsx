import React from 'react';
import {Route} from 'react-router-dom';
import s from './App.module.css'
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {actionsType, rootStateType} from "./Redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


type appType = {
    store: any
    dispatch: (action: actionsType) => void
    state: rootStateType
}

function App(props: appType) {
    return (
            <div className={s.appWrapper}>
                <Header/>
                <Navbar/>
                <div className={s.appWrapperContent}>
                    <Route path='/Profile' render={() => <Profile store={props.store} dispatch={props.dispatch} profilePage={props.state.profilePage}/>}/>
                    <Route path='/Dialogs' render={() => <DialogsContainer store={props.store} />}/>
                </div>
            </div>
    );
}

export default App;
