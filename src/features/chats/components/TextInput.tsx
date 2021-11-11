import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

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

  const handleClickButton = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (message.length > 0) {
      handleClick(message)
    }

    setMessage('')
  }
  return (
    <>
      <form onSubmit={handleClickButton} className={classes.wrapForm}>
        <TextField
          id="standard-text"
          label="Nhập tin nhắn"
          className={classes.wrapText}
          value={message}
          onChange={(event => setMessage(event.target.value))}
          //margin="normal"
        />
        <Button type='submit' variant="contained" color="primary" className={classes.button}>
          <SendIcon />
        </Button>
      </form>
    </>
  )
}

export default TextInput
