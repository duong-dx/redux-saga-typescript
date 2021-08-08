import { makeStyles, Theme } from '@material-ui/core/styles';
import { Song } from '../../../constants';
import anhNy from '../../contexts/images/ny.jpg'

export type propsCardStyle = {
  song: Song,
  type: 'dark' | 'light'
}

const cardStyle = makeStyles ((themes:Theme) => ({
  grid: {
    display: 'flex !important',
    justifyContent: 'center !important',
    textAlign: 'center'
  },
  card: {
    display: 'flex',
    margin: '20px auto',
    maxWidth: '95%',
    minHeight: '100px',
    padding: 15,
    alignItems: 'center',
    borderRadius: '38px',
    color: (props: propsCardStyle) =>
      props.song.playing ? '#787ffb' : '#aeadb0',
    backgroundColor:
      (props: propsCardStyle) => props.song.playing ? '#f6f4ff' : '#FFF'
  },
  icon: {
    display: 'flex'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: (props: propsCardStyle) =>
      `url(${props.song.avatarThumbnail ? props.song.avatarThumbnail : anhNy})`,
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: '50% !important',
    backgroundSize: 'cover !important',
    position: 'relative',
  },
  title: {
    fontSize: '22px',
    margin: '0px 0px 20px 0px'
  },

  description: {
    fontSize: '18px',
    wordBreak: 'break-word',
    margin: 0
  },
  '@media (max-width: 960px)': {
    image: {
      width: 75,
      height: 75,
    },
  },
  '@media (max-width: 400px)': {
    card: {
      display: 'flex',
      margin: '20px auto',
      maxWidth: '95%',
      minHeight: '60px',
      padding: 10,
    },
    image: {
      width: 45,
      height: 45,
    },
    icon: {
      fontSize: '16px'
    },
  },

}))

export { cardStyle }