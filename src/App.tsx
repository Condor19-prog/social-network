import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import s from './App.module.css'
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {rootStateType, updateNewPostText} from "./Redux/state";

type appType = {
    state: rootStateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

function App(props: appType) {
    return (
        <BrowserRouter>
            <div className={s.appWrapper}>
                <Header/>
                <Navbar/>
                <div className={s.appWrapperContent}>
                    <Route path='/Profile' render={() => <Profile posts={props.state.profilePage}
                                                                  addPost={props.addPost}
                                                                  updateNewPostText={updateNewPostText}
                                                                  newPostText={props.state.profilePage.newPostText}
                    />}/>
                    <Route path='/Dialogs' render={() => <Dialogs dialogs={props.state.dialogPage.dialogs}
                                                                  messages={props.state.dialogPage.messages}
                    />}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
