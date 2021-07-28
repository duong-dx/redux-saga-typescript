import axiosClient from './axiosClient';

const postAPI = {
  getAll(accessToken: string) {
    const url = '/posts/index'
    return axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
  },
}

export default postAPI
