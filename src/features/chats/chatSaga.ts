import * as Effects from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from '../../hooks';
import { chatActions } from './chatSlide';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAction, LoginPayload } from '../auth/authSlice';
import { EventChannel, eventChannel, Task } from 'redux-saga';
import { getToken, getUser } from '../../repositories/localStorage/get';

const put: any = Effects.put;
const call: any = Effects.call;
const fork: any = Effects.fork;
const take: any = Effects.take;
const cancel: any = Effects.cancel;

export interface MessagePayload {
  message: string,
  room: string,
}

function connect() {
  const token = getAccessToken();
  const url = process.env.REACT_APP_SOCKET_URL ?? '';
  const socket = io(url, {
    query: { token }
  });

  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('room', 'room1');
      console.log("Socket connected");

      resolve(socket);
    });
  })
}

function* receivedMessage(socket: Socket) {
  const message: MessagePayload = yield call(listenServer, socket);

  while (true) {
    yield put(chatActions.sendMessageSuccess, message)
  }
}

function* listenServer(socket: Socket) {
  return new Promise((resolve, reject) => {
    if (!socket) return reject('No socket connection.');

    socket.on('message-received', (message: MessagePayload) => {
      resolve(message);
    });
  });
}

function subscribe(socket: Socket) {
  return eventChannel(emitter => {
    socket.on('message-received', (message) => {
      emitter(chatActions.sendMessageSuccess(message));
    });

    socket.on('disconnect', e => {
      // TODO: handle
    });

    return () => {};
  });
}

function* read(socket: Socket) {
  const channel: EventChannel<any> = yield call(subscribe, socket);

  while (true) {
    let action: PayloadAction = yield take(channel);

    yield put(action);
  }
}

function* send(socket: Socket) {
  while (true) {
    const { payload } = yield take(chatActions.sendMessage.type)

    socket.emit('messages', payload)
  }
}

function* handleIO(socket: Socket) {
  yield fork(read, socket);
  yield fork(send, socket);
}

function* flowSocket() {
  const socket: Socket = yield call(connect)

  const task: Task = yield fork(handleIO, socket)

  yield take(authAction.logout.type)
  yield cancel(task)

  console.log('cancel(task)')
}

function* flow() {
  while (true) {
    const isLoggedIn = Boolean(getToken())
    const currentUser = Boolean(getUser());

    if (isLoggedIn && currentUser) {
      yield call(flowSocket)
    } else {
      yield take(authAction.loginSuccess)
      
      yield call(flowSocket)
    }
  }
}

export default function* chatSaga() {
  yield fork(flow)
}