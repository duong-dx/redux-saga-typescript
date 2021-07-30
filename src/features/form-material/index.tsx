import React from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import List from './components/list';
import themes from './theme';

const Index: React.FC = () => {
  return (
    <MuiThemeProvider theme={themes}>
      <List/>
    </MuiThemeProvider>
  )
}

export default React.memo(Index)