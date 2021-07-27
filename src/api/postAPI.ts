import axiosClient from './axiosClient';

const postAPI = {
  getAll() {
    const url = '/index'
    axiosClient.get(url)
  },
}

export default postAPI