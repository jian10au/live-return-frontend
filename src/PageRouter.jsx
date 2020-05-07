import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignInPage } from '../src/pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import InvestmentsPage from './pages/InvestmentsPage';
import PortfoliosPage from './pages/PortfoliosPage';
import DashboardPage from './pages/DashboardPage';
import PortfolioNewPage from './pages/PortfolioNewPage';
import { EditPortfolioPage } from './pages/EditPortfolioPage';

import { ProtectedRoute } from './ProtectedRoute';

const PageRouter = () => {
  console.log('renderd from PageRouter');
  return (
    <Switch>
      <ProtectedRoute exact path="/investments" component={InvestmentsPage} />
      <ProtectedRoute
        exact
        path="/user/portfolios"
        component={PortfoliosPage}
      />
      <ProtectedRoute
        exact
        path="/user/portfolios/edit/:id"
        component={EditPortfolioPage}
      />

      <ProtectedRoute path="/portfolio/new" component={PortfolioNewPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route
        exact
        path="/authfailure"
        component={() => {
          return (
            <div>You have signed out. Please sign in again to continue.</div>
          );
        }}
      />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/" component={SignInPage} />
    </Switch>
  );
};

export default PageRouter;
