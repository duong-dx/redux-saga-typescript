import * as Effects from "redux-saga/effects"
import {
  addList,
  getList,
  ListPost,
  addPostRequest,
  PostPayload
} from './postSlice';
import postAPI from "../../../api/postAPI";
import { PayloadAction } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';

const takeEvery: any = Effects.takeEvery;
const put: any = Effects.put;
const call: any = Effects.call;

interface Response {
  data: any
}

function* handleGetList(action: PayloadAction<string>) {
  const response: Response = yield call(() => postAPI.getAll(action.payload))
  const {data} = response.data
  const dataList: ListPost = {
    posts: data.data,
    total: data.total,
    page: data.current_page,
    limit: data.per_page,
    loading: false
  }
  yield put(addList(dataList))
}

function* handleCreatePost (action: PayloadAction<PostPayload>) {
  yield call(
    () => postAPI.createPost(action.payload.post, action.payload.token)
      .then(
        () => action.payload.history.push('/posts')
      )
      .catch(error => {
        console.log(error)
      })
  )

}

export function* list () {
  yield takeEvery(getList.toString(), handleGetList)
}

export function* addPost() {
  yield takeEvery(addPostRequest.toString(), handleCreatePost)
}

export default function* postSaga() {
  yield all([
    list(),
    addPost()
  ])
}