import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  title: string,
  description: string
  image: any
}

export type ListPost = {
  posts: Post[],
  page: number,
  limit: number,
  total: number,
  loading: boolean
}

export interface PostPayload {
  post: Post,
  token: string,
  history: any
}

const initialState: ListPost = {
  posts: [],
  page: 1,
  limit: 10,
  total: 0,
  loading: false
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getList(state, action: PayloadAction<string>) {
      const newState = {...state}
      newState.loading = true
      state = newState
      return state
    },

    addList(state: ListPost, action: PayloadAction<ListPost>) {
      state = action.payload
      return state
    },

    addPostRequest(state, action: PayloadAction<PostPayload>) {

    }
  }
})

export const {getList, addList, addPostRequest} = postSlice.actions
export {
  initialState
}
export default postSlice.reducer;
