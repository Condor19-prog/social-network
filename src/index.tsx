import React from 'react';
import './index.css';
import {addPost, state, subscribe, updateNewPostText} from "./Redux/state";
import ReactDOM from "react-dom";
import App from "./App";


export const renderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
renderEntireTree()
subscribe(renderEntireTree)
