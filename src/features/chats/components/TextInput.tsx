import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { Conversation } from '../chatSlide';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
      width: "100%"
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);
interface Props {
  handleClick: (message: string ) => any
}

const TextInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState('')
  const {handleClick} = props

  const handleClickButton = () => {
    if (message.length > 0) {
      handleClick(message)
    }

    setMessage('')
  }
  return (
    <>
      <div className={classes.wrapForm}>
        <TextField
          id="standard-text"
          label="メッセージを入力"
          className={classes.wrapText}
          value={message}
          onChange={(event => setMessage(event.target.value))}
          //margin="normal"
        />
        <Button onClick={handleClickButton} variant="contained" color="primary" className={classes.button}>
          <SendIcon />
        </Button>
      </div>
    </>
  )
}

export default TextInput
