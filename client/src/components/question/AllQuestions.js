import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SearchField from "react-search-field";
import { Card, CardBody, CardTitle } from "reactstrap";
import classes from "./AllQuestion.module.css";
const AllQuestions = () => {
  const [questions, setQuestions] = useState(null);
  const [safeQuestions, setSafeQuestions] = useState(null);
  const history = useHistory();
  const [sortBy, setSortBy] = useState("Newest");
  useEffect(() => {
    console.log("AllQuestions");
    const allQuestions = async () => {
      const { data } = await axios.get("/api/question");
      //console.log(data);
      setQuestions(data);
      setSafeQuestions(data);
    };
    allQuestions();
  }, []);

  const questionSorting = () => {
    switch (sortBy) {
      case "Votes":
        return (a, b) => b.voteCount - a.voteCount;
      case "Newest":
        return (a, b) => new Date(b.postedOn) - new Date(a.postedOn);
      case "Oldest":
        return (a, b) => new Date(a.postedOn) - new Date(b.postedOn);
      default:
        break;
    }
  };

  const sortByNewestHandler = () => {
    setSortBy("Newest");
  };

  const sortByOldestHandler = () => {
    setSortBy("Oldest");
  };

  const sortByVotesHandler = () => {
    setSortBy("Votes");
  };

  const onChangeHandler = (event) => {
    if (event === "") {
      setQuestions(safeQuestions);
    } else {
      const filteredQuestions = safeQuestions.filter((ques) =>
        ques.title.toLowerCase().includes(event.toLowerCase())
      );
      setQuestions(filteredQuestions);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="display-3">All Questions Page </h1>
        <SearchField onChange={onChangeHandler} />
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
          <div>
            <h5 className="h5">Sort by</h5>
            <div className="btn-group" role="group">
              <button onClick={sortByVotesHandler} className="btn btn-primary">
                {" "}
                Votes
              </button>
              <button onClick={sortByNewestHandler} className="btn btn-primary">
                {" "}
                Newest
              </button>
              <button onClick={sortByOldestHandler} className="btn btn-primary">
                {" "}
                Oldest
              </button>
            </div>
          </div>
        )}
        {questions &&
          questions.sort(questionSorting()).map((question) => (
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>Click to get Details</Tooltip>
              }
            >
              <Link
                to={`/questions/${question._id}`}
                className={classes.getDetails}
              >
                <div className="my-3">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h5> {question.title}</h5>
                      </CardTitle>
                      <p className="text-muted">
                        {" "}
                        Posted by: {question.author.username}
                      </p>
                      <p> Votes : {question.voteCount}</p>
                      <h5>{question.text}</h5>
                      <p> {question.answers.length} Replies</p>
                    </CardBody>
                  </Card>
                </div>
              </Link>
            </OverlayTrigger>
          ))}
      </div>
    </Fragment>
  );
};

export default AllQuestions;
