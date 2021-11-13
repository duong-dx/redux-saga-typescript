import * as Effects from "redux-saga/effects"
import { PayloadAction } from '@reduxjs/toolkit'
import { authAction, LoginPayload } from './authSlice'
import authApi from '../../api/authApi';
import { AxiosResponse } from 'axios';
import { getToken, getUser } from '../../repositories/localStorage/get';
import {setToken, setUser} from '../../repositories/localStorage/set';
import { User } from '../../models/user'
import { push } from 'connected-react-router';
import { clearToken, clearUser } from '../../repositories/localStorage/clear';

const put: any = Effects.put;
const call: any = Effects.call;
const fork: any = Effects.fork;
const take: any = Effects.take;

function* handleLogin(payload: LoginPayload)
{
  try {
    const response: AxiosResponse = yield call(authApi.login, payload)
    const {token, user} = response.data
    setToken(token)
    const newUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      last_message_id: null
    }
    setUser(newUser)
    yield put(authAction.loginSuccess(newUser))
    yield put(push('/list'))
  } catch(error) {
    const {response}: {response: AxiosResponse} = error
    yield put(authAction.logout())
    if ([422, 401].indexOf(response?.status ) >= 0) {
      yield put(authAction.loginFailed('Tài khoản hoặc mật khẩu không chính xác'))
    } else {
      yield put(authAction.loginFailed('Đã có lỗi xảy ra'))
    }
  }
}

function* handleLogout()
{
  clearUser()
  clearToken()
  yield put(push('/sign-in'))
}


function* listenLoginFlow() {
  /*
    authAction.login.type : "auth/login"
   */
  while (true) {
    const isLoggedIn = Boolean(getToken())
    const currentUser = Boolean(getUser());
    if (!isLoggedIn && !currentUser) {
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take(authAction.logout.type)
    yield call(handleLogout)
  }
}

export default function* authSaga() {
  yield fork(listenLoginFlow)
  // yield takeEvery(authAction.login.toString(), handleLogin)
}
