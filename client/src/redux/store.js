import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from './user/userSlice';
import persistStore from 'redux-persist/es/persistStore';

const  rootReducers = combineReducers({
  user:userReducer,
});
const persistConfig ={
  key: 'root',
  storage,
  version:1,

}

const persistReduce = persistReducer(persistConfig,rootReducers);
export const store = configureStore({
  reducer:persistReduce,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  }),
 
})

export const persistor = persistStore(store);
