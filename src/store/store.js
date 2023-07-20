import { configureStore } from '@reduxjs/toolkit';
// import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';

import { rootReducer } from './root-reducers';
import { rootSaga } from './root.saga';

const persistConfig = {
  key: 'root',
  storage,
  blackList: ['user', 'categories']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();



// const composeEnhancer = 
//   (process.env.NODE_ENV !== 'production' 
//     && window 
//     && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));


// export const store = createStore(persistedReducer, undefined, composedEnhancers);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(
  Boolean
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)