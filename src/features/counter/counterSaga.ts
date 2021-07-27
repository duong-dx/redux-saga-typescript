import {takeEvery, delay, put, takeLatest} from "@redux-saga/core/effects"
import {PayloadAction} from '@reduxjs/toolkit';
import {incrementBySaga, incrementBySagaSuccess} from './counterSlice'
import { yellow } from '@material-ui/core/colors';

// export function* log(action: PayloadAction) {
//  console.log('Log', action)
// }

export function* handleIncrementBySaga (action: PayloadAction<number>) {
 console.log('handle increment by saga');
 // wait 2second
 console.log('waiting 2second');
 yield delay(2000)
 console.log('Waiting success, dispatch action');
 yield put(incrementBySagaSuccess(action.payload))
}

export default function* counterSaga () {
 console.log('counterSaga')
 //take Every
 yield takeEvery(incrementBySaga.toString(), handleIncrementBySaga)
 //takeLatest
 // yield takeLatest(incrementBySaga.toString(), handleIncrementBySaga)
}