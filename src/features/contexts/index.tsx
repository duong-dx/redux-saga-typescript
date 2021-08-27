import React, {useState, useCallback} from 'react';
import {ITodo} from './TodoContext'
// import CustomButton from "./CustomButton";
import CustomButton1 from "./CustomButton1";
import TodoContext, {ContextType} from "./TodoContext";
import TextField from '@material-ui/core/TextField';
import {Formik, Form, Field, FormikProps, FormikValues} from 'formik';
import * as Yup from 'yup'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import "moment/locale/vi";
import moment, {parseZone, isDate} from 'moment';

import './scss/index.scss'

const initialITodo: ITodo = {
  id: 0,
  name: '',
  title: '',
  description: '',
  status: false,
  time: '',
  image: '',
  color: '',
}

const initialValue = {
  id: 0,
  email: '',
  name: '',
  phone: '',
  birthday: null,
  title: '',
  description: '',
  status: false,
  time: '',
  image: '',
  color: '',
}
const today = moment()

const formatDate = (date: string | number | Date) => {
  return moment(date).format('DD/MM/YYYY');
}

const REGEX_PHONE = /^((0)|(\+84)\d{2}-\d{3}-\d{4})|((0)|(\+84)\d{9})$/;

const Index:React.FC<TestAppProps> = ({closeModal}) => {
  const { saveTodo } = React.useContext(TodoContext) as ContextType

  const schema = Yup.object().shape({
    email: Yup.string().required('Hãy nhập email').email('Hãy nhập định dạng email'),
    phone: Yup.string()
      .required('Hãy nhập số điện thoại')
      .matches(REGEX_PHONE, 'Hãy nhập đúng định dạng số điện thoại')
    ,
    birthday: Yup.date()
      .required('Hãy nhập ngày sinh')
      .nullable()
      .min('01/01/2000', ({ min }) => `Ngày sinh phải sau ngày ${formatDate(min)}`)
      .max(today, ({ max }) => `Ngày sinh phải trước ngày ${formatDate(max)}`),
    name: Yup.string().required('Trường này là bắt buộc'),
    title: Yup.string().required('Trường này là bắt buộc'),
    description: Yup.string().required('Trường này là bắt buộc')
  })

  const saveData = useCallback((value, props):void => {
    const newData = {
      ...initialITodo,
      name: value.name,
      title: value.title,
      description: value.description
    }
    saveTodo(newData)
    closeModal()
  }, [])

  const handleDateChange = useCallback((value, props: FormikProps<FormikValues>) => {
    props.setFieldValue('birthday', value)
  }, [])
  return (
    <div className='parent'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={saveData}
      >
        {
          (props: FormikProps<FormikValues>) =>
            <Form>
              <div>
                <Field
                  as={TextField}
                  className='form-control'
                  label="Họ tên"
                  variant="outlined"
                  type="text"
                  name='name'
                  error={!!props.errors.name}
                  helperText={props.errors.name}
                  placeholder='Tên của bạn ?'
                />
              </div>
              <div>
                <Field as={TextField}
                  className='form-control'
                  label="Email"
                  variant="outlined"
                  type="text"
                  name='email'
                  error={!!props.errors.email}
                  helperText={props.errors.email}
                  placeholder='Địa chỉ email của bạn ?'
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  className='form-control'
                  label="Số điện thoại"
                  variant="outlined"
                  type="text"
                  name='phone'
                  error={!!props.errors.phone}
                  helperText={props.errors.phone}
                  placeholder='Số điện thoại của bạn ?'
                />
              </div>
              <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    className='form-control'
                    variant="inline"
                    format="DD/MM/YYYY"
                    margin="normal"
                    label="Ngày sinh"
                    name='birthday'
                    onChange={value => props.setFieldValue('birthday', value)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    value={props.values.birthday}
                    error={!!props.errors.birthday}
                    helperText={props.errors.birthday}
                    placeholder='Ngày sinh của bạn ?'
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <Field as={TextField}
                  className='form-control'
                  label="Tiêu đề"
                  variant="outlined"
                  type="text"
                  name='title'
                  error={!!props.errors.title}
                  helperText={props.errors.title}
                  placeholder='Viết điều gì đó vào đây'
                />
              </div>
              <div>
                <Field as={TextField}
                  className='form-control'
                  label="Mô tả"
                  variant="outlined"
                  type="text"
                  name='description'
                  error={!!props.errors.title}
                  helperText={props.errors.title}
                  placeholder='Viết điều gì đó vào đây'
                  multiline
                  rows={4}
                />
              </div>
              {/*<CustomButton>Save</CustomButton>*/}
              <div>
                <CustomButton1>Ấn vào đây ❤️</CustomButton1>
              </div>
            </Form>
        }
      </Formik>
    </div>
  );
}

interface TestAppProps {
  closeModal: () => void
}

export default React.memo(Index);
