import {compose, createStore, applyMiddleware, Middleware} from 'redux';
import logger from "redux-logger";
import {persistStore, persistReducer, PersistConfig} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "./root-saga";

import {rootReducer} from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

// Middlewares
// Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Below language trick [].filter(Boolean) only leaves values in array that are NOT boolean
const middlewares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

// Compose enhancer is defined only in case we're not in production and REDUX_DEVTOOLS ext is available
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))


type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}
// Redux persist
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    // User comes from firebase
    whitelist: ['cart']
}

const appPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(appPersistReducer, undefined, composedEnhancers);
// After store is instantiated run root Saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);