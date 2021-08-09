import React, {useState, useEffect, useCallback} from 'react';
import  Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar';
import  MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import firebase, {message} from './firebase'
import PushNotification from 'api/push-notification';
import { getAccessToken } from './hooks';

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
    .then(() => {
      return messaging.getToken()
    })
    .then(token => {
      return PushNotification.addDeviceToken(token, getAccessToken())
    })
    .then(response => {
      console.log(response)
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
    </div>
  );
}

export default App;
