import React, { useCallback, useState } from 'react';
import {listStyle} from '../styles/list'
import {withStyles} from '@material-ui/core';
import Card from './card';
import { Icon } from '@iconify/react';
import featherMoon from '@iconify/icons-mdi/moon-and-stars';
import sun from '@iconify/icons-mdi/sun-advisory';
import { Song } from '../../../constants';
import anhNy from '../../contexts/images/anh12.jpeg'
import '../scss/list.scss'


type Props = {
  classes: any
}

const List: React.FC<Props> = (props) => {
  const {classes} = props
  const [song, setSong] = useState<Song>({
    name: 'Yêu em',
    url: '',
    avatarThumbnail: anhNy,
    singer: 'Huệ',
    playing: false,
    like: true
  })

  const handlePlaySong = useCallback(() => {
    setSong({...song, playing: !song.playing})
  }, [song])

  const handleDislikeSong = useCallback(() => {
    setSong({...song, like: !song.like})
  }, [song])
  const [checked, setChecked] = useState(false)
  return (
    <div className={classes.list}>
      <div className={classes.checkBox}>
        <label id={'dark-light'} >
          <input defaultChecked={checked} onClick={() => setChecked(!checked)} className='toggle-checkbox' type='checkbox' />
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
      </div>
      <Card
        handleClick={handlePlaySong}
        type={!checked ? 'light' : 'dark'}
        song={song}
        handleDislikeSong={handleDislikeSong}
      />
    </div>
  )
}

export default React.memo(withStyles(listStyle)(List))