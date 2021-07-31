import React from 'react';
import {ButtonPlayStyle} from '../styles/button-play'
import {Button} from '@material-ui/core';
import { Pause, PlayArrow } from '@material-ui/icons';
interface Props {
  playing: boolean
  handleClick: any
}
const ButtonPlay: React.FC<Props> = (props) => {
  const classes = ButtonPlayStyle(props)
  const {playing, handleClick} = props
  return (
    <Button className={classes.root} onClick={handleClick}>
      {playing ? <Pause className={classes.icon} />: <PlayArrow className={classes.icon}/>}
    </Button>
  )
}

export default React.memo(ButtonPlay)