import {createStyles, Theme} from '@material-ui/core';

const listStyle = createStyles ((themes:Theme) => ({
  list: {
    padding: 15
  },

  checkBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#fff !important',
    '&:focus-visible': {
      outline: '-webkit-focus-ring-color auto 0'
    }
  }
}))

export { listStyle }