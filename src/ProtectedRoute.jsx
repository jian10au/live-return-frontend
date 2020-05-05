import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//HOC design may seems very confusing
const _ProtectedRoute = ({ component: PageComponent, user, ...rest }) => {
  console.log(user, 'Am i getting the userToken');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <PageComponent user={user} {...props} />;
        } else {
          return <Redirect to="/authfailure" />;
        }
      }}
    />
  );
};

const mapStateToProps = (AppState) => {
  console.log(AppState);
  const { user } = AppState.auth;
  return { user };
  //notice, this thing actuall append the global state to the component
};

export const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute);
