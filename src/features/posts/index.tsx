import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getAll} from './redux/postSlice'

const Post:React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAll);
  }, [dispatch])
  return (
    <div> </div>
  )
}

export default Post;
