import React from 'react';
import { playerStyle } from './styles';
import { withStyles } from '@material-ui/core';
import { Song } from '../../constants';
import './scss/index.scss'

type Props = {
  classes: any,
  song: Song
}

const Index: React.FC<Props> = (props) => {
  const { classes } = props

  return (
    <div className={classes.player}>
      <div className={classes.controlPlayer}>
      </div>
    </div>
  )
}

export default React.memo(withStyles(playerStyle)(Index))