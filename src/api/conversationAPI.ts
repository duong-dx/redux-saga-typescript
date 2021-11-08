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
    take: number | null,
    page: number | null,
  ) {
    const url = '/messages'
    return axiosClient.get(url, {
      params: {
        conversation_id: conversationId,
        take,
        page,
      },
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },
}

export default postAPI
