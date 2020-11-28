import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/state";

export let callSubscriber = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={store.getState()}
                 addPost={store.addPost}
                 updateNewPostText={store.updateNewPostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
callSubscriber(store.getState)
store.subscribe(renderEntireTree)
