import React from 'react';
import {cardStyle} from '../styles/card'
import {Grid} from '@material-ui/core';
import ButtonPlay from './button-play';
import { Favorite, FavoriteBorder, MoreVert } from '@material-ui/icons';

const Card: React.FC<any> = (props) => {
  const classes = cardStyle(props)
  const { song, handleClick, handleDislikeSong} = props
  const { like, playing} = song

  return (
    <div className={classes.card}>
      <Grid className={classes.grid} item xs={2}>
        <div className={classes.image} />
      </Grid>
      <Grid className={classes.grid} item xs={5}>
        <div> Duong dx</div>
      </Grid>
      <Grid className={classes.grid} item xs={2}>
        <ButtonPlay handleClick={handleClick} playing={playing} />
      </Grid>
      <Grid className={classes.grid} item xs={2}>
        {like ?
          <Favorite onClick={handleDislikeSong} className={classes.icon} />
          :
          <FavoriteBorder onClick={handleDislikeSong} className={classes.icon}/>
        }
      </Grid>
      <Grid className={classes.grid} item xs={2}>
        <MoreVert className={classes.icon}/>
      </Grid>
    </div>
  )
}

export default React.memo(Card)