import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";

export let renderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App store={store.getState()}
                 dispatch={store.dispatch.bind(store)}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
renderEntireTree()
store.subscribe(renderEntireTree)
