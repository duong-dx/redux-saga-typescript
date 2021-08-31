import React, {Suspense, lazy} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RoutePublic from './route-public';
import RoutePrivate from './route-private';
import { STYLE_LOADER, COLOR_LOADER, listRouter, router } from '../constants';
import { Spinner } from 'react-spinners-css';

const RouterComponent: React.FC = () => {
  return (
    <Suspense fallback={<div style={STYLE_LOADER}><Spinner color={COLOR_LOADER} /></div>}>
      <Switch>
        <Redirect exact from='/' to='/list' />
        {listRouter.map((subRouter: router) => {
          if (subRouter.auth) {
            return <RoutePrivate key={subRouter.key} exact path={subRouter.path} component={lazy(() => import(`../containers/${subRouter.component}`))} />
          }
          return <RoutePublic key={subRouter.key} exact path={subRouter.path} component={lazy(() => import('../containers/login'))} />
        })}
        <Redirect to='/list' />
      </Switch>
    </Suspense>
  );
}

export default RouterComponent
