import React, { useCallback, useEffect } from 'react';
import {RootState} from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getList, Post } from '../redux/postSlice';
import Card from './card'
import {Link} from  'react-router-dom'
import { getAccessToken } from '../../../hooks/index';

const PostComponent:React.FC = () => {
  const dispatch = useDispatch();
  const token:string = getAccessToken()
  const posts = useSelector((state: RootState) => state.posts)
  useEffect(() => {
    dispatch(getList(token))
  }, [])

  const renderListPost = useCallback(() => {
    return posts.posts && posts.posts.map((post: Post, index:number) => <Card key={index} post={post} />)
  }, [posts])
  return (
    <div>
      <Link to={'/posts/create'}><button>Click me</button></Link>
      {posts.loading ? <p>loading.....</p> : renderListPost()}
    </div>
  )
}

export default PostComponent;
