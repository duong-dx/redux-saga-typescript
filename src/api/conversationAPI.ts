import axiosClient from './axiosClient';
import { Post } from '../features/posts/redux/postSlice';

const postAPI = {
  getAll(accessToken: string) {
    const url = '/users/conversations/get'
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },

  getAllMessage(
    accessToken: string,
    conversationId: number | string,
    page: number | null,
  ) {
    const url = '/messages'
    return axiosClient.get(url, {
      params: {
        conversation_id: conversationId,
        page,
      },
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },

  updateLastMessage(
    accessToken: string,
    conversationId: number,
    userId: number,
    messageId: number,
  ) {
    const url = '/user-conversation/update/last-message'
    return axiosClient.put(url, {
      conversation_id: conversationId,
      user_id: userId,
      message_id: messageId,
    },{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }, )
  },
}

export default postAPI
