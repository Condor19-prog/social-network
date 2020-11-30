import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import s from './App.module.css'
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {actionsType, rootStateType} from "./Redux/state";

type appType = {
    store: rootStateType
    dispatch: (action: actionsType) => void
}

function App(props: appType) {
    return (
        <BrowserRouter>
            <div className={s.appWrapper}>
                <Header/>
                <Navbar/>
                <div className={s.appWrapperContent}>
                    <Route path='/Profile' render={() => <Profile posts={props.store.profilePage}
                                                                  dispatch={props.dispatch}
                    />}/>
                    <Route path='/Dialogs' render={() => <Dialogs dialogsAndMessages={props.store.dialogPage}
                                                                  dispatch={props.dispatch}

                    />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
