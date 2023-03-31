import {compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import {rootReducer} from "./root-reducer";

// Middlewares
const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares))

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