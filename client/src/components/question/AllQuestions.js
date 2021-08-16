import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
const AllQuestions = () => {
  const [questions, setQuestions] = useState(null);
  const [sortBy, setSortBy] = useState("Newest");
  useEffect(() => {
    console.log("AllQuestions");
    const allQuestions = async () => {
      const { data } = await axios.get("/api/question");
      console.log(data);
      setQuestions(data);
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

  return (
    <Fragment>
      <div className="container">
        <h1 className="display-3">All Questions Page </h1>
        {!questions && <p> Loading...</p>}
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
                  <p> Upvotes : {question.voteCount}</p>
                  <h5>{question.text}</h5>
                  <p> {question.answers.length} Replies</p>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default AllQuestions;
