import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./auth";
import Private from "./components/private";
import Public from "./components/public";
const Router = (props) => (
  <Switch>
    <Route exact path="/public" component={Public} />
    <PrivateRoute path="/protected" component={Private} />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

export default Router;
