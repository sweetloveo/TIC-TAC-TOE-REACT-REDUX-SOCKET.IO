import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"

import socket from "./socket"
import createSocketIoMiddleware from "redux-socket.io"

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { composeWithDevTools } from "redux-devtools-extension"

import reducers from './reducers'
import sagas from "./sagas"

import App from "./containers/App"
import "normalize.css"

const history = createHistory()

const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk, routeMiddleware, socketIoMiddleware))
)

sagaMiddleware.run(sagas)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
, document.getElementById("app"))