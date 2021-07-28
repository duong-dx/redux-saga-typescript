import * as Effects from "redux-saga/effects"
import {addList, getList, ListPost, initialState} from "./postSlice"
import postAPI from "../../../api/postAPI";
const takeEvery: any = Effects.takeEvery;
const put: any = Effects.put;
const call: any = Effects.call;

function* handleGetList() {
  interface Response {
    data: any
  }
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjI3NDgyMTkwLCJleHAiOjE2MjgwODY5OTAsIm5iZiI6MTYyNzQ4MjE5MCwianRpIjoieFhMN3Voa3VJNmVvclRWViIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.KLcsEO0XbMM67l6KDLZ6B0o6UslClEUdfkF-1V1px_E'
  const response: Response = yield call(() => postAPI.getAll(token))
  const {data} = response.data
  const dataList: ListPost = {
    posts: data.data,
    total: data.total,
    page: data.current_page,
    limit: data.per_page
  }
  yield put(addList(dataList))
}

export function* list () {
  yield takeEvery(getList.toString(), handleGetList)
}

