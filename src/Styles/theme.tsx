import { createMuiTheme } from '@material-ui/core/styles'

const themes = createMuiTheme({
  palette: {
    primary: {
      light: '#009688',
      main: '#009688',
      dark: '#00796B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#607D8B',
      main: '#607D8B',
      dark: '#455A64',
      contrastText: '#FFFFFF',
    },
  },
});

export default themes