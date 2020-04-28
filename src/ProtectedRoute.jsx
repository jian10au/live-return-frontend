import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//HOC design may seems very confusing
const _ProtectedRoute = ({ component: PageComponent, userToken, ...rest }) => {
  console.log(userToken, 'Am i getting the userToken');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userToken) {
          return <PageComponent userToken={userToken} {...props} />;
        } else {
          return <Redirect to="/authfailure" />;
        }
      }}
    />
  );
};

const mapStateToProps = (AppState) => {
  console.log(AppState);
  return { userToken: AppState.user };
  //notice, this thing actuall append the global state to the component
};

export const ProtectedRoute = connect(mapStateToProps)(_ProtectedRoute);
