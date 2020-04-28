import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../src/pages/LoginPage';
import InvestmentsPage from '../src/pages/InvestmentsPage';
import { ProtectedRoute } from '../src/ProtectedRoute';

const AppRouter = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/investments" component={InvestmentsPage} />
      <Route exact path="/" component={LoginPage} />
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
