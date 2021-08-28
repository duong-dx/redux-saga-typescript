import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


const RoutePrivate: React.FC<RouteProps> = (props) => {
  const authentication = useSelector((state: RootState) => state.auth)

  return authentication.isLoggedIn ? <Route {...props} component={props.component} /> : <Route {...props}><Redirect to="/sign-in" /></Route>
}

export default RoutePrivate
