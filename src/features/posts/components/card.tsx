import React from 'react';
import { Post } from '../redux/postSlice'

interface Props {
  post: Post
}
const Card: React.FC<Props> = (props) => {
  const {post} = props
  return (
    <div>
      <p>title: {post.title}</p>
      <p>description: {post.description}</p>
    </div>
  )
}

export default React.memo(Card)