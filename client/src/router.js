import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./auth";
import AllQuestions from "./components/question/AllQuestions";
import AddNewQuestion from "./components/question/NewQuestionForm";
import QuestionDetail from "./components/question/QuestionDetail";
import RegisterUserForm from "./components/registerUser/RegisterUser";
const Router = (props) => (
  <Switch>
    <PrivateRoute exact path="/questions/new" component={AddNewQuestion} />
    <Route exact path="/questions/:questionId" component={QuestionDetail} />
    <Route exact path="/questions" component={AllQuestions} />
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
