import {compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import {rootReducer} from "./root-reducer";

// Middlewares
// Below language trick [].filter(Boolean) only leaves values in array that are NOT boolean
const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// Compose enhancer is defined only in case we're not in production and REDUX_DEVTOOLS ext is available
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

// Redux persist
const persistConfig = {
    key: 'root',
    storage: storage,
    // User comes from firebase
    blacklist: ['user']
}

const appPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(appPersistReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);