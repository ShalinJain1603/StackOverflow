import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import classes from "./UserProfile.module.css";
const UserProfile = (props) => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(null);
  const history = useHistory();
  useEffect(() => {
    console.log("User");
    const getUser = async () => {
      const { data: userData } = await axios.get("/api/profile");
      console.log(userData);
      setUser(userData);

      const { data: questionData } = await axios.get(
        `/api/question?user=${userData._id}`
      );
      console.log(questionData);
      setQuestions(questionData);
    };
    getUser();
  }, []);

  const ReDirectHandler = () => {
    history.push("/user/edit");
  };
  return (
    <Fragment>
      {!user && <p> Loading...</p>}
      {user && (
        <div className="container m-3">
          <div className="row">
            <div className="col-md-4 align-items-center d-flex flex-column mt-5">
              <img src={user?.image?.url} className={classes.letterhead} />
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <h3> {user.batch} batch</h3>
              <h3> {user.department}</h3>
              <h3> {user.hostel}</h3>
              <button onClick={ReDirectHandler}>Edit</button>
            </div>
            <div className="col-md-8">
              My Questions : {questions && questions.length}
              {!questions && (
                <p className="m-3">
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </p>
              )}
              {questions && (
                <div className={classes.scroll}>
                  {questions.map((question) => (
                    <Link
                      to={`/questions/${question._id}`}
                      className={classes.getDetails}
                    >
                      <div className="my-3">
                        <Card>
                          <CardBody>
                            <h5>{question.text}</h5>
                            <p> {question.answers.length} Replies</p>
                          </CardBody>
                        </Card>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
