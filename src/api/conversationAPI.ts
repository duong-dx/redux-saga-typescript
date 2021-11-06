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
}

export default postAPI
