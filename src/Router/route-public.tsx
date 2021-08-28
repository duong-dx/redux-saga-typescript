import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const RoutePublic: React.FC<RouteProps> = (props) => {
  const authentication = useSelector((state: RootState) => state.auth)

  return authentication.isLoggedIn ? <Route {...props}><Redirect to="/list" /></Route> : <Route {...props} component={props.component} />
}


export default RoutePublic
