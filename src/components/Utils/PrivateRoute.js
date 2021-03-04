import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenFromSession } from "./OverAll";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getTokenFromSession() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;