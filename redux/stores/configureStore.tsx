import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import appReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(appReducer,
    {},
    composeEnhancers(
        applyMiddleware(thunk),
    )
);

