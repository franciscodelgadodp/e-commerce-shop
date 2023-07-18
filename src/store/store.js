import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import logger from 'redux-logger';

import { rootReducer } from './root-reducers';

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk
].filter(
  Boolean
);

const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' 
    && window 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

const persistConfig = {
  key: 'root',
  storage,
  blackList: ['user', 'categories']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)