import React, {useState, useEffect, useCallback} from 'react';
import  Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar';
import  MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import firebase, {message} from './firebase'
import PushNotification from 'api/push-notification';
import { getAccessToken } from './hooks';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from "./features/auth/authSlice"
import { ExitToApp } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { RootState } from './app/store';

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
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [dataNotify, setDataNotify] = useState<Notification>({title: '', body: ''});
  const [stateData, setStateData] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    severity: 'success'
  });

  message.onMessage((payload) => {
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
      .then(() => {
        return messaging.getToken()
      })
      .then(token => {

        //push client id to server
        // return PushNotification.addDeviceToken(token, getAccessToken())
      })
      .then(response => {
        // console.log(response)
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
  }, [])

  
  const handleClose = useCallback((event?: React.SyntheticEvent, reason?: string) => {
    setStateData({ ...stateData, open: false });
  }, [stateData]);

  const { vertical, horizontal, open } = stateData;

  const handleClick = useCallback(() => {
    dispatch(authAction.logout())
  }, [])

  return (
    <div>
      {auth.isLoggedIn &&
        <Button
          onClick={handleClick}
          variant="contained"
          size="large"
          style={
            {
              backgroundColor: 'red',
              borderRadius: '50%',
              height: '70px',
              width: '70px',
              position: 'fixed',
              top: '40px',
              right: '40px',
              zIndex: 1000
            }
          }
          color='primary'>
          <ExitToApp/>
        </Button>
      }
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
    </div>
  );
}

export default App;
