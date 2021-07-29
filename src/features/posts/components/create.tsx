import React, { useCallback, useState } from 'react';
import {addPostRequest} from '../redux/postSlice'
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router';

const CreateComponent:React.FC = () => {
  const dispatch = useDispatch()
  const token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjI3NDgyMTkwLCJleHAiOjE2MjgwODY5OTAsIm5iZiI6MTYyNzQ4MjE5MCwianRpIjoieFhMN3Voa3VJNmVvclRWViIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.KLcsEO0XbMM67l6KDLZ6B0o6UslClEUdfkF-1V1px_E'
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
