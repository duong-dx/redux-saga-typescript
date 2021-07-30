import React, { useState } from 'react';
import {listStyle} from '../styles/list'
import {withStyles} from '@material-ui/core';
import Card from './card';
import '../scss/list.scss'
// npm install --save-dev @iconify/react @iconify-icons/noto
import { Icon, InlineIcon } from '@iconify/react';
import featherMoon from '@iconify/icons-mdi/moon-and-stars';
import sun from '@iconify/icons-mdi/sun-advisory';

type Props = {
  classes: any
}

const List: React.FC<Props> = (props) => {
  const {classes} = props
  const [checked, setChecked] = useState(false)
  return (
    <div className={classes.list}>
      <label className={classes.checkBox}>
        <input checked={checked} onClick={() => setChecked(!checked)} className='toggle-checkbox' type='checkbox' />
        <div className='toggle-slot'>
          <div className='sun-icon-wrapper'>
            <Icon className="iconify sun-icon" icon={sun}  />
          </div>
          <div className='toggle-button' />
          <div className='moon-icon-wrapper'>
            <Icon className="iconify moon-icon" icon={featherMoon} />
          </div>
        </div>
      </label>
      <Card type={!checked ? 'light' : 'dark'}/>
    </div>
  )
}

export default React.memo(withStyles(listStyle)(List))