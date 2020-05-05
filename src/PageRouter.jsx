import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignInPage } from '../src/pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import InvestmentsPage from './pages/InvestmentsPage';
import PortfoliosPage from './pages/PortfoliosPage';
import DashboardPage from './pages/DashboardPage';

import { ProtectedRoute } from './ProtectedRoute';

const PageRouter = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/investments" component={InvestmentsPage} />
      <ProtectedRoute exact path="/portfolios" component={PortfoliosPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route
        exact
        path="/authfailure"
        component={() => {
          return <div>Unauthorised</div>;
        }}
      />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/" component={SignInPage} />
    </Switch>
  );
};

export default PageRouter;
