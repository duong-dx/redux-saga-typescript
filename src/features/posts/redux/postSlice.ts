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
    getList(state, action: PayloadAction) {
      console.log(state, action, 'getList');
    },

    addList(state: ListPost, action: PayloadAction<ListPost>) {
      state = action.payload
      console.log(state, action, 'addList - postSlice');
      return state
    },

    add(state: ListPost, action: PayloadAction<Post>) {
      state.posts = [...state.posts, action.payload]
      console.log(state, action, 'add - postSlice');
      return state
    }
  }
})

export const {getList, addList, add} = postSlice.actions
export {
  initialState
}
export default postSlice.reducer;
