import {all} from 'redux-saga/effects'
import counterSaga from '../features/counter/counterSaga';
import postSaga from '../features/posts/redux/postSaga'
import authSaga from '../features/auth/authSaga';
import chatSaga from '../features/chats/chatSaga';

export default  function* rootSaga() {
  yield all([
    counterSaga(),
    postSaga(),
    authSaga(),
    chatSaga(),
  ])
}
