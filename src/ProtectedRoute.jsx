import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//HOC design may seems very confusing
const _ProtectedRoute = ({ component: PageComponent, username, ...rest }) => {
  console.log(username, 'Am i getting the userToken');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (username) {
          return <PageComponent username={username} {...props} />;
        } else {
          return <Redirect to="/authfailure" />;
        }
      }}
    />
  );
};

const mapStateToProps = (AppState) => {
  const { username } = AppState.auth;
  return { username };
  //notice, this thing actuall append the global state to the component
};

export const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute);
