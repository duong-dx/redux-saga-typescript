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
    minWidth: '90%',
    minHeight: 300,
    padding: 15,
    left: '50%',
    bottom: '5%',
    borderRadius: 20,
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    background: 'rgba(255, 255, 255, .2)'
  },

  // progress: {
  //   minHeight: 400,
  //   width: '90%',
  // },
  // bars:  {
  //   width: '300px',
  //   height: '150px',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  // },
  // bar: {
  //   height: '100%',
  //   width: '9%',
  // },
  // "@-moz-keyframes sound": {
  //   "0%": {
  //     opacity: 0.35,
  //     background: "#f3f3f3",
  //     height: 1,
  //   },
  //   "100%": {
  //     opacity: 0,
  //     transform: "translateY(-200%)"
  //   }
  // },
  //
  // "@-webkit-keyframes sound": {
  //   "0%": {
  //     opacity: 0.35,
  //     background: "#f3f3f3",
  //     height: 1,
  //   },
  //   "100%": {
  //     opacity: 0,
  //     transform: "translateY(-200%)"
  //   }
  // },
  //
  // "@-o-keyframes sound": {
  //   "0%": {
  //     opacity: 0.35,
  //     background: "#f3f3f3",
  //     height: 1,
  //   },
  //   "100%": {
  //     opacity: 0,
  //     transform: "translateY(-200%)"
  //   }
  // },
  //
  // "@keyframes sound": {
  //   "0%": {
  //     opacity: 0.35,
  //     background: "#f3f3f3",
  //     height: 1,
  //   },
  //   "100%": {
  //     opacity: 0,
  //     transform: "translateY(-200%)"
  //   }
  // },

}))

export { playerStyle }