import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import BurgerBuilderReducer from './store/reducers/burgerBuilder';
import OrderReducer from './store/reducers/order';
import AuthReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state',store.getState());
            return result;
        }
    }
}

const rootReducer = combineReducers({
    burgerBuilder : BurgerBuilderReducer,
    order : OrderReducer,
    auth : AuthReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;

const store = createStore(rootReducer , composeEnhancers(applyMiddleware( thunk )));

const app = <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>;
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
