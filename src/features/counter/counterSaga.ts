import {takeEvery} from "@redux-saga/core/effects"
import {PayloadAction} from '@reduxjs/toolkit';

export function* log(action: PayloadAction) {
 console.log('Log', action)
}

export default function* counterSaga () {
 console.log('counterSaga')
 yield takeEvery('*', log)
}