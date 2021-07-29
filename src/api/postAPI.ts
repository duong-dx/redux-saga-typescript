import axiosClient from './axiosClient';
import { Post } from '../features/posts/redux/postSlice';

const postAPI = {
  getAll(accessToken: string) {
    const url = '/posts/index'
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },
  
  createPost(data: Post, accessToken: string) {
    return axiosClient.post('/posts', data,{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  }
}

export default postAPI
