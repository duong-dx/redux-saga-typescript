import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { getToken, getUser } from '../../repositories/localStorage/get';

export interface AuthState {
  isLoggedIn: boolean,
  logging?: boolean,
  errors: string,
  currentUser?: User,
}

export interface LoginPayload {
  email: string,
  password: string,
}

const initialState: AuthState = {
  isLoggedIn: Boolean(getToken()),
  logging: false,
  errors: '',
  currentUser: getUser() || undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.logging = true
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false
      state.isLoggedIn = true
      state.errors = ''
      state.currentUser = action.payload
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
      state.errors = action.payload
    },

    logout(state) {
      state.errors = ''
      state.logging = false
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  }
})

export const authAction = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer

