import React from 'react';
import {cardStyle} from '../styles/card'

type Props = {
  type: string
}
const Card: React.FC<any> = (props) => {
  const classes = cardStyle(props)

  console.log(classes);
  return (
    <div className={classes.card}>
      <p className={classes.title}>title</p>
      <p className={classes.description}>description</p>
    </div>
  )
}

export default React.memo(Card)