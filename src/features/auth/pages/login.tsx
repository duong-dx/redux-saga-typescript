import React, { useCallback } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginStyle from '../styles/login';
import { useDispatch, useSelector } from 'react-redux';
import { authAction, LoginPayload } from '../authSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../../app/store';
import Alert from '@material-ui/lab/Alert';

const initialValue: LoginPayload = {
  email: '',
  password: '',
};

const SignIn: React.FC = () => {
  const classes = LoginStyle();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth)
  const handleSubmitForm = useCallback((value) => {
    dispatch(authAction.login(value));
  }, []);

  const schema = Yup.object().shape({
    email: Yup.string().required('Hãy nhập email').email('Hãy nhập định dạng email'),
    password: Yup.string().required('Hãy nhập số mật khẩu'),
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Đăng nhập
        </Typography>
        {auth.errors && <Alert severity="error" onClose={() => {}}>{auth.errors}</Alert>}

        <Formik
          onSubmit={handleSubmitForm}
          initialValues={initialValue}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={schema}
        >
          {
            (props) =>
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Địa chỉ email'
                  name='email'
                  autoComplete='email'
                  placeholder='Nhập địa chỉ email'
                  error={!!props.errors.email}
                  helperText={props.errors.email}
                  autoFocus
                />
                <Field
                  as={TextField}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Mật khẩu'
                  placeholder='Nhập mật khẩu'
                  type='password'
                  id='password'
                  error={!!props.errors.password}
                  helperText={props.errors.password}
                  autoComplete='current-password'
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Lưu thông tin đăng nhập'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {auth.logging ? <CircularProgress color={'inherit'} /> : 'Đăng nhập'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      Quên mật khẩu?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='#' variant='body2'>
                      {'Bạn chưa có tài khoản? Đăng ký ngay'}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
          }
        </Formik>

      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
};

export default React.memo(SignIn);
