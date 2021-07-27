import React from 'react';
import AddTodo from '../features/contexts';
import TodoProvide from "../features/contexts/TodoProvide";
import Todos from "../features/contexts/Todos";
import {DialogContent, DialogTitle, Dialog, Button} from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import '../features/contexts/scss/index.scss'

const List:React.FC = () => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return <TodoProvide>
    <div className='text'>
      <span className='multicolor-text' >React ContextAPI and Typescipt</span>
    </div>
    <Button
      onClick={handleClickOpen}
      variant="contained"
      size="large"
      style={{ borderRadius: '50%', height: '70px', width: '70px', position: 'fixed', bottom: '40px', right: '40px' }}
      color='primary'>
      <BorderColorIcon/>
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
