import axiosClient from './axiosClient';
import { LoginPayload } from '../features/auth/authSlice';

const postAPI = {
  login(params: LoginPayload) {
    return axiosClient.post('/login', params)
  }
}

export default postAPI
