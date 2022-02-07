import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/posts/redux/postSlice';
import createSagaMiddleware  from 'redux-saga'
import rootSaga from "./rootSaga";
import authReducer from '../features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux'
// import { MemoryHistory } from 'history';
import {history} from '../utils';
import chatReducer from "../features/chats/chatSlide"

// const createRootReducer = (history: MemoryHistory) => combineReducers({
//   router: connectRouter(history),
// })

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  posts: postReducer,
  auth: authReducer,
  chat: chatReducer,
})

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
