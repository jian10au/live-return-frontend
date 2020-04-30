import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../src/pages/LoginPage';
import InvestmentsPage from '../src/pages/InvestmentsPage';
import PortfoliosPage from '../src/pages/PortfoliosPage';
import DashboardPage from '../src/pages/DashboardPage';

import { ProtectedRoute } from '../src/ProtectedRoute';

const AppRouter = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/investments" component={InvestmentsPage} />
      <ProtectedRoute exact path="/portfolios" component={PortfoliosPage} />
      <Route exact path="/" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route
        exact
        path="/authfailure"
        component={() => {
          return <div>Unauthorised</div>;
        }}
      />
    </Switch>
  );
};

export default AppRouter;
