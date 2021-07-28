import React, { useEffect, useState } from 'react';
import {RootState} from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getList, initialState, ListPost } from './redux/postSlice';

const Post:React.FC = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<ListPost>(initialState)
  const newPost = useSelector((state: RootState) => state.posts)
  useEffect(() => {
    dispatch(getList())
  }, [])

  useEffect(() => {
    console.log(newPost, 3232);
  }, [newPost])
  return (
    <div><button onClick={() => dispatch(getList())}>Click me</button></div>
  )
}

export default Post;
