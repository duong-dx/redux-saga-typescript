import { makeStyles, Theme } from '@material-ui/core/styles';

export type propsCardStyle = {
  type: 'dark' | 'light'
}

const cardStyle = makeStyles ((themes:Theme) => ({
  card: {
    display: 'block',
    margin: '20px auto',
    maxWidth: '350px',
    minHeight: '200px',
    padding: 10,
    borderRadius: 15,
    border: (props: propsCardStyle) =>
      props.type === 'dark' ? 'none' :
        `2px solid ${themes.palette.primary.dark}`,
    color: (props: propsCardStyle) =>
      props.type === 'dark' ? themes.palette.primary.contrastText :
        themes.palette.primary.dark,
    backgroundColor:
      (props: propsCardStyle) =>
        props.type === 'dark' ? themes.palette.primary.dark :
        themes.palette.primary.contrastText
  },

  title: {
    fontSize: '22px',
    margin: '0px 0px 20px 0px'
  },

  description: {
    fontSize: '18px',
    wordBreak: 'break-word',
    margin: 0
  }
}))

export { cardStyle }