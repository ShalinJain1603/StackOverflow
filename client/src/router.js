import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./auth";
import AllQuestions from "./components/question/AllQuestions";
import EditQuestionForm from "./components/question/EditQuestion";
import AddNewQuestion from "./components/question/NewQuestionForm";
import QuestionDetail from "./components/question/QuestionDetail";
import AllQuestionsByTag from "./components/Tags/AllQuestionsByTags";
import EditUserForm from "./components/user/EditUser";
import RegisterUserForm from "./components/user/RegisterUser";
import UserProfile from "./components/userprofile/Userprofile";
import Home from "./components/Home/Home";

const Router = (props) => (
  <Switch>
    <PrivateRoute exact path="/questions/new" component={AddNewQuestion} />
    <Route exact path="/questions/:questionId" component={QuestionDetail} />
    <Route
      exact
      path="/questions/:questionId/edit"
      component={EditQuestionForm}
    />
    <Route exact path="/questions" component={AllQuestions} />
    <Route exact path="/register" component={RegisterUserForm} />
    <Route exact path="/tags" component={AllQuestionsByTag} />
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path="/user" component={UserProfile} />
    <PrivateRoute exact path="/user/edit" component={EditUserForm} />
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
