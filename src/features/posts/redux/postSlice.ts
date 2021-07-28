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
  total: number
}

const initialState: ListPost = {
  posts: [],
  page: 1,
  limit: 10,
  total: 0
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAll(state: ListPost, action: PayloadAction<ListPost>) {
      console.log(state, action, 'getAll - postSlice');
      state = action.payload
    },

    add(state: ListPost, action: PayloadAction<Post>) {
      console.log(state, action, 'add - postSlice');
      state.posts = [...state.posts, action.payload]
    }
  }
})

export const {getAll, add} = postSlice.actions
export {
  initialState
}
export default postSlice.reducer;
