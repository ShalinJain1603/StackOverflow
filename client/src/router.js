import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./auth";
import Private from "./components/private";
import Public from "./components/public";
import AddNewQuestion from "./components/question/NewQuestionForm";
import RegisterUserForm from "./components/registerUser/RegisterUser";
const Router = (props) => (
  <Switch>
    <Route exact path="/public" component={Public} />
    <PrivateRoute exact path="/question/new" component={AddNewQuestion} />
    <PrivateRoute path="/private" component={Private} />
    <Route exact path="/register" component={RegisterUserForm} />
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
