import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./auth";
import Private from "./components/private";
import Public from "./components/public";
import AddNewQuestion from './components/question/NewQuestionForm';
import RegisterUserForm from "./components/registerUser/RegisterUser";
import QuestionDetail from './components/question/QuestionDetail';
import AllQuestions from './components/question/AllQuestions';
import UserProfile from './components/userprofile/Userprofile';
const Router = (props) => (
  <Switch>
    <Route exact path="/public" component={Public} />
    <Route exact path="/questions/new" component={AddNewQuestion} />
    <Route exact path="/questions/:questionId" component={QuestionDetail} />
    <Route exact path="/questions" component={AllQuestions} />
    <PrivateRoute path="/protected" component={Private} />
    <Route exact path="/register" component={RegisterUserForm} />
    <Route path="/user" component={UserProfile} />
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
