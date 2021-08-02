import { makeStyles, Theme } from '@material-ui/core/styles';
interface propButtonPlay {
  playing: boolean
}

const ButtonPlayStyle = makeStyles ((themes:Theme) => ({
  root: {
    background: (props: propButtonPlay) =>
      props.playing ? '#787ffb' : '#aeadb0',
    borderRadius: '8px',
    border: 0,
    color: 'white',
    height: '46px',
    fontSize: '13px',
    minWidth: "46px",
    boxShadow: (props: propButtonPlay) =>
      props.playing ? '#383b73' : '#aeadb0',
    "&:active": {
      background: (props: propButtonPlay) =>
        props.playing ? '#787ffb' : '#aeadb0',
      boxShadow: (props: propButtonPlay) =>
        props.playing ? '#383b73' : '#aeadb0',
    },
    "&:hover": {
      background: (props: propButtonPlay) =>
        props.playing ? '#787ffb' : '#aeadb0',
      boxShadow: (props: propButtonPlay) =>
        props.playing ? '#383b73' : '#aeadb0',
    },
    "&:disabled": {
      background: '#aeadb0',
      boxShadow: '#aeadb0',
      color: 'white'
    },
  },
  label: {
    textTransform: 'capitalize',
  },
  icon: {},
  '@media (max-width: 400px)': {
    root: {
      height: '30px',
      minWidth: "30px",
    },

    icon: {
      fontSize: '16px'
    }
  },
}))

export { ButtonPlayStyle }