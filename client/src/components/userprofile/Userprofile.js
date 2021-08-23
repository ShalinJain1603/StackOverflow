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
    const getUser = async () => {
      const { data: userData } = await axios.get("/api/profile");
      setUser(userData);

      const { data: questionData } = await axios.get(
        `/api/question?user=${userData._id}`
      );
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
            <div className="col-md-4">
              <div className="align-items-center d-flex flex-column mt-3">
                <div className="card d-flex flex-column w-75">
                  <img
                    src={user?.image?.url}
                    className="img-fluid card-img-top"
                  />
                  <div className="card-body">
                    <div className="card-title"> User Details:</div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        {user.firstname} {user.lastname}
                      </li>
                      <li className="list-group-item">{user.batch} batch</li>
                      <li className="list-group-item">{user.department}</li>
                      <li className="list-group-item"> {user.hostel}</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={ReDirectHandler}
                  className="btn btn-warning w-50 mt-3"
                >
                  Edit
                </button>
              </div>
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
