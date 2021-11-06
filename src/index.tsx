import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import themes from './Styles/theme';
import { MuiThemeProvider } from '@material-ui/core';
import {subscribeUser} from "./subscriptions"
import { ConnectedRouter} from 'connected-react-router';
import {history} from './utils';
import RouterComponent from './Router'
import {socket, SocketContext} from './app/context';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/*<SocketContext.Provider value={{socket}}>*/}
          <MuiThemeProvider theme={themes}>
            <App />
            <RouterComponent />
          </MuiThemeProvider>
        {/*</SocketContext.Provider>*/}
      </ConnectedRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

// subscribeUser()
