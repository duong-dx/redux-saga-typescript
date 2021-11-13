import * as Effects from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from '../../hooks';
import { chatActions, Conversation, Message, RequestMessage, UpdateLastMessage } from './chatSlide';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAction } from '../auth/authSlice';
import { EventChannel, eventChannel, Task } from 'redux-saga';
import { getToken, getUser } from '../../repositories/localStorage/get';
import conversationAPI from '../../api/conversationAPI';
import { takeEvery } from '@redux-saga/core/effects';
import { message } from '../../firebase';

const put: any = Effects.put;
const call: any = Effects.call;
const fork: any = Effects.fork;
const take: any = Effects.take;
const cancel: any = Effects.cancel;

/**
 * handle socket
 */

function connect() {
  const token = getAccessToken();
  const url = process.env.REACT_APP_SOCKET_URL ?? '';
  const socket = io(url, {
    query: { token }
  });

  return new Promise(resolve => {
    socket.on('connect', () => {
      // socket.emit('room', 'room1');
      resolve(socket);
    });
  })
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

}

/**
 * end handle socket
 */

/**
 * handle conversation
 */

interface ResponseConversation {
  data: {
    name: string | null;
    id: number | string | null;
    email: string | null;
    createAt: Date | string | null;
    updateAt: Date | string | null;
    conversations: Conversation[]
  }
}

interface ResponseMessages {
  data: {
    page_total: number;
    results: Message[];
    total: number;
  }
}
function* handleGetListConversation() {
  const token = getAccessToken();
  const response: ResponseConversation = yield call(conversationAPI.getAll, token)
  const { conversations } = response.data;

  yield put(chatActions.requestConversationSuccess(conversations))
}
//end handleGetListConversation

/**
 * handle request messages
 */

function* handleGetListMessages(action: PayloadAction<RequestMessage>) {
  const token = getAccessToken();
  const response: ResponseMessages = yield call(
    conversationAPI.getAllMessage,
    token,
    action.payload.conversation_id,
    action.payload.page,
  )

  yield put(chatActions.requestMessagesSuccess({
    messages: response.data.results,
    page: action.payload.page,
    total: response.data.total,
    scrollHeight: action.payload.scrollHeight,
  }))
}

function* handleUpdateLastMessage(action: PayloadAction<UpdateLastMessage>) {
  const token = getAccessToken();
  const response: ResponseMessages = yield call(
    conversationAPI.updateLastMessage,
    token,
    action.payload.conversation_id,
    action.payload.user_id,
    action.payload.message_id,
  )

  console.log(response, 22222);
}

function* flow() {
  while (true) {
    const isLoggedIn = Boolean(getToken())
    const currentUser = Boolean(getUser());

    yield takeEvery(chatActions.requestConversation, handleGetListConversation)

    yield takeEvery(chatActions.requestMessages, handleGetListMessages)

    yield takeEvery(chatActions.updateLastMessage, handleUpdateLastMessage)

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