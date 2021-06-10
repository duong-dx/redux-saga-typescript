import React, {useState} from 'react';
import {ITodo} from './TodoContext'
// import CustomButton from "./CustomButton";
import CustomButton1 from "./CustomButton1";
import TodoContext, {ContextType} from "./TodoContext";
import TextField from '@material-ui/core/TextField';
import './scss/index.scss'

const Index:React.FC<TestAppProps> = () => {
  const { saveTodo } = React.useContext(TodoContext) as ContextType
  const [valueForm, setValueForm] = useState<ITodo | {}>()
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target
    setValueForm( {
      ...valueForm,
      [name]: value
      }
    )
  }
  
  const saveData = (e: React.MouseEvent<HTMLInputElement>, data: ITodo | any):void => {
    saveTodo(data)
  }
  
  return (
    <div className='parent'>
      <div>
        <TextField
          className='form-control'
          label="Họ tên"
          variant="outlined"
          type="text"
          name='name'
          onChange={handleChangeValue}
          placeholder='Tên của bạn ?'
        />
      </div>
      <div>
        <TextField
          className='form-control'
          label="Tiêu đề"
          variant="outlined"
          type="text"
          name='title'
          onChange={handleChangeValue}
          placeholder='Viết điều gì đó vào đây'
          />
      </div>
      <div>
        <TextField
          className='form-control'
          label="Mô tả"
          variant="outlined"
          type="text"
          name='description'
          onChange={handleChangeValue}
          placeholder='Viết điều gì đó vào đây'
          multiline
          rows={4}
        />
      </div>
      {/*<CustomButton>Save</CustomButton>*/}
      <div><CustomButton1 handleSave={(e: any) => saveData(e, valueForm)}>Ấn vào đây ❤️</CustomButton1></div>
    </div>
  );
}

interface TestAppProps {}

export default Index;
