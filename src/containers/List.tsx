import React from 'react';
import AddTodo from '../features/contexts';
import TodoProvide from "../features/contexts/TodoProvide";
import Todos from "../features/contexts/Todos";
import {DialogContent, DialogTitle, Dialog, Button} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import '../features/contexts/scss/index.scss'
import PushNotification from 'api/push-notification';
import { getAccessToken } from '../hooks';

const List:React.FC = () => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickTest = () => {

    PushNotification.testNotification(getAccessToken())
  }
  
  return <TodoProvide>
    <div className='text'>
      <span className='multicolor-text' >React ContextAPI and Typescipt</span>
    </div>
    <Button
      onClick={handleClickOpen}
      variant="contained"
      size="large"
      style={{ borderRadius: '50%', height: '70px', width: '70px', position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000 }}
      color='primary'>
      <BorderColorIcon/>
    </Button>
    <Button
      onClick={handleClickTest}
      variant="contained"
      size="large"
      style={{ borderRadius: '50%', height: '70px', width: '70px', position: 'fixed', bottom: '150px', right: '40px', zIndex: 1000}}
      color='primary'>
      <NotificationsActiveIcon/>
    </Button>
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Thêm mới bài viết
      </DialogTitle>
      <DialogContent>
        <AddTodo closeModal={handleClose} />
      </DialogContent>
    </Dialog>
    <Todos />
  </TodoProvide>
}

export default React.memo(List)
