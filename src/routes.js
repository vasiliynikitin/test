import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import WelcomePage from './Pages/WelcomePage';
import LogonPage from './Pages/LogonPage';
import NotFoundPage from './Pages/NotFoundPage';

const routes = (user) => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={user.login ? WelcomePage : LogonPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>;
};

export default routes;