import React, {lazy, Suspense, useState, useEffect, useCallback} from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Spinner } from 'react-spinners-css';
import  Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar';
import  MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {router, listRouter} from './constants'
import firebase, {message} from './firebase'
const history = createBrowserHistory();

const renderComponent = (router: router, index: number):any => {
  const style = {
    minHeight: '100vh',
    justifyContent: "center",
    display: 'flex',
    alignItems:'center',
    margin: 'auto'
  }
  
  const color:string = 'linear-gradient(#0259af,rgb(144 205 228 / 80%))'
  const  Component = lazy(() => import(`./containers/${router.component}`))
  return <Route
    key={index}
    exact path={`/${router.url}`}
    render={() =>
      <Suspense fallback={<div style={style}><Spinner color={color} /></div>}><Component />
      </Suspense>} />
}
export interface State extends SnackbarOrigin {
  open: boolean;
  severity: "error" | "success" | "info" | "warning" | undefined
}

export interface Notification {
  title: any,
  body: any
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App: React.FC = () => {

  const [dataNotify, setDataNotify] = useState<Notification>({title: '', body: ''});
  const [stateData, setStateData] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    severity: 'success'
  });

  message.onMessage((payload) => {
    console.log(payload)
    if(!payload?.notification) {
      setStateData({...stateData, open: true, severity: 'error'})
      return;
    }
    
    const {notification} = payload

    setStateData({...stateData, open: true, severity: 'success'})
    setDataNotify({title: notification.title, body: notification.body})
  });

  useEffect(() => {
    const messaging = firebase.messaging()
    messaging.requestPermission()
    .then(token => {
      return messaging.getToken()
    })
    .then(token => {
      console.log(token)
    })
  }, [])

  
  const handleClose = useCallback((event?: React.SyntheticEvent, reason?: string) => {
    setStateData({ ...stateData, open: false });
  }, [stateData]);

  const { vertical, horizontal, open } = stateData;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={stateData.severity}>
          {dataNotify.title}
        </Alert>
      </Snackbar>

      <Router history={history}>
        <Switch>
          <Redirect exact from='/' to='/list' />
          
          {/* eslint-disable-next-line array-callback-return */}
          {listRouter.map((subRouter:router, index) => renderComponent(subRouter, index))}
          <Redirect to='/list' />
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
