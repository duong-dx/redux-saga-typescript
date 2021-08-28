import {takeEvery, delay, put, takeLatest} from "@redux-saga/core/effects"
import {PayloadAction} from '@reduxjs/toolkit';
import {incrementBySaga, incrementBySagaSuccess} from './counterSlice'


export function* handleIncrementBySaga (action: PayloadAction<number>) {
 // wait 2second
 yield delay(2000)
 yield put(incrementBySagaSuccess(action.payload))
}

export default function* counterSaga () {
 //take Every
 yield takeEvery(incrementBySaga.toString(), handleIncrementBySaga)
 //takeLatest
 // yield takeLatest(incrementBySaga.toString(), handleIncrementBySaga)
}
