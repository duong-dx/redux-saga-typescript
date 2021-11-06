// import { chatActions, Conversation } from './chatSlide';
// import { getAccessToken } from '../../hooks';
// import conversationAPI from '../../api/conversationAPI';
// import * as Effects from 'redux-saga/effects';
//
// const put: any = Effects.put;
// const call: any = Effects.call;
// const fork: any = Effects.fork;
// const take: any = Effects.take;
// const cancel: any = Effects.cancel;
//
// /**
//  * handle conversation
//  */
//
// interface ResponseConversation {
//   data: {
//     name: string | null;
//     id: number | string | null;
//     email: string | null;
//     createAt: Date | string | null;
//     updateAt: Date | string | null;
//     conversations: Conversation[]
//   }
// }
// function* handleGetListConversation() {
//   const token = getAccessToken();
//   const response: ResponseConversation = yield call(conversationAPI.getAll, token)
//   const { conversations } = response.data;
//
//   yield put(chatActions.requestConversationSuccess(conversations))
// }
// //end handleGetListConversation
//
// /**
//  * handle request messages
//  */
//
// function* handleGetListMessages() {
//   console.log(2222229999);
// }
//
// function* flow() {
//   yield fork(chatActions.requestConversation)
//   yield call(handleGetListConversation)
//
//   yield fork(chatActions.requestMessages)
//   yield call(handleGetListMessages)
// }

export default '2222'