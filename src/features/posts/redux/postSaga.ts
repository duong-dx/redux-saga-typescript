import {takeEvery, put, call} from "redux-saga/effects"
import {getAll, initialState, ListPost} from "./postSlice"
import postAPI from "../../../api/postAPI";


function* handleGetList() {
  interface Response {
    data: any
  }
  const response:Response = yield call(postAPI.getAll);
  const {data} = response
  yield put(getAll(data))
}

export function* PostSaga () {
  yield takeEvery(getAll.toString(), handleGetList)
}

