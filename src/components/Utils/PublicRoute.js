import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getTokenFromSession } from "./OverAll";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getTokenFromSession() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/vieworders" }} />
        )
      }
    />
  );
}

export default PublicRoute;
