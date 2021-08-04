import {createStyles, Theme} from '@material-ui/core';
import { propsCardStyle } from '../../music/styles/card';
import backGround from '../../../assets/images/preview.jpg';

const playerStyle = createStyles ((themes:Theme) => ({
  player: {
    minHeight: '100vh',
    background: (props: propsCardStyle) => {
      return `url(${props.song.avatarThumbnail ? props.song.avatarThumbnail : backGround})`
    },
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: '50% !important',
    backgroundSize: 'cover !important',
    position: 'relative',

  },
  controlPlayer: {
    transform: 'translateX(-50%)',
    position: 'absolute',
    minWidth: '85%',
    minHeight: 300,
    padding: 15,
    left: '50%',
    bottom: '5%',
    borderRadius: 20,
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    background: 'rgba(255, 255, 255, .2)'
  },
}))

export { playerStyle }