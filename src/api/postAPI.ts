import axiosClient from './axiosClient';

const postAPI = {
  getAll() {
    const url = '/index'
    return axiosClient.get(url)
  },
}

export default postAPI
