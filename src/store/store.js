import  {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import {rootReducer} from "./root-reducer";

// Middlewares
// Below language trick [].filter(Boolean) only leaves values in array that are NOT boolean
const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// Redux persist
const persistConfig = {
    key: 'root',
    storage: storage,
    // User comes from firebase
    blacklist: ['user']
}

const appPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: appPersistReducer,
    // Has default middlewares including react thunk. Passing an array of middlewares will override default middlewares
    // In case function is passed - it allows to access and configure default middlewares
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middlewares)
});

export const persistor = persistStore(store);