import React from 'react';
import './index.css';
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/redux-store";
import {rootStateType} from "./Redux/store";
import {BrowserRouter} from "react-router-dom";


export let renderEntireTree = (state: rootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App store={store}
                     state={state}
                     dispatch={store.dispatch.bind(store)}
                />
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

