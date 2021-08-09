import { createMuiTheme } from '@material-ui/core/styles'

const themes = createMuiTheme({
  palette: {
    primary: {
      light: '#00BCD4',
      main: '#03A9F4',
      dark: '#0288D1',
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