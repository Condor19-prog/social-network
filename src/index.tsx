import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";
import {rootStateType} from "./Redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


export let renderEntireTree = (state: rootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                <App />
                </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
renderEntireTree(store.getState())

store.subscribe(() => {
        let state = store.getState()
        renderEntireTree(state)
    }
)

