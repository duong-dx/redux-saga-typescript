import React, { useCallback, useState } from 'react';
import {addPostRequest} from '../redux/postSlice'
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router';
import { getAccessToken } from '../../../hooks';

const CreateComponent:React.FC = () => {
  const dispatch = useDispatch()
  const token:string = getAccessToken()
  const [valueForm, setValueForm] = useState({
    title: '',
    description: '',
    image: ''
  })
  const history = useHistory();

  const handleChange = useCallback((event) => {
    const {name, value} = event.target
    setValueForm({...valueForm, [name]: value})
  }, [valueForm])

  const handleSubmitForm = useCallback((event) => {
    event.preventDefault()
    const valueSubmit = {
      title: valueForm.title ? valueForm.title : 'đây là title',
      description: valueForm.description ? valueForm.description : 'đây là description',
      image: ''
    }
    dispatch(addPostRequest({post: valueSubmit, token, history}))
  }, [valueForm])
  return (
    <div>
      create post
      <form onSubmit={handleSubmitForm}>
        <input
          onChange={handleChange}
          type='text'
          name='title'
          value={valueForm.title}
        />
        <input
          onChange={handleChange}
          type='text'
          name='description'
          value={valueForm.description}
        />
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  )
}

export default CreateComponent;
