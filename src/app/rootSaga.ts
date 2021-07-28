import {all} from 'redux-saga/effects'
import counterSaga from '../features/counter/counterSaga';
import {list} from '../features/posts/redux/postSaga'
function* helloSaga() {
  console.log('hello Saga')
}

export default  function* rootSaga() {
  console.log('root saga')
  yield all([
    helloSaga(),
    counterSaga(),
    list()
  ])
}
