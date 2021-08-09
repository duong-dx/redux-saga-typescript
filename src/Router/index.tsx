import React, {lazy, Suspense} from 'react';
import {router, listRouter} from '../constants'
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Spinner } from 'react-spinners-css';

const renderComponent = (router: router, index: number):any => {
  const style = {
    minHeight: '100vh',
    justifyContent: "center",
    display: 'flex',
    alignItems:'center',
    margin: 'auto'
  }
  
  const color:string = 'linear-gradient(#0259af,rgb(144 205 228 / 80%))'
  const  Component = lazy(() => import(`../containers/${router.component}`))
  return <Route
    key={index}
    exact path={`/${router.url}`}
    render={() =>
      <Suspense fallback={<div style={style}><Spinner color={color} /></div>}>
        <Component />
      </Suspense>} />
}

const history = createBrowserHistory();


export default function RouterComponent () {
  return (
    <Router history={history}>
        <Switch>
          <Redirect exact from='/' to='/list' />
          
          {/* eslint-disable-next-line array-callback-return */}
          {listRouter.map((subRouter:router, index) => renderComponent(subRouter, index))}
          <Redirect to='/list' />
        </Switch>
      </Router>
  );
}
