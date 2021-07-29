import React, { useCallback, useEffect } from 'react';
import {RootState} from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { getList, Post } from '../redux/postSlice';
import Card from './card'
import {Link} from  'react-router-dom'

const PostComponent:React.FC = () => {
  const dispatch = useDispatch();
  const token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjI3NDgyMTkwLCJleHAiOjE2MjgwODY5OTAsIm5iZiI6MTYyNzQ4MjE5MCwianRpIjoieFhMN3Voa3VJNmVvclRWViIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.KLcsEO0XbMM67l6KDLZ6B0o6UslClEUdfkF-1V1px_E'
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
