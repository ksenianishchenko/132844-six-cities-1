import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from 'react-router-dom';

export const withPrivateRoute = ({component: Component, authed}) => (
  <Route render={(props) => (
    authed === false
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
);

withPrivateRoute.propTypes = {
  component: PropTypes.func,
  authed: PropTypes.bool
};
