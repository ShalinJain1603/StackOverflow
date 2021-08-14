import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

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
      <h1>All Questions Page </h1>
      {!questions && <p> Loading...</p>}
      {questions && (
        <div>
          <h2>Sort by</h2>
          <button onClick={sortByVotesHandler}> Votes</button>
          <button onClick={sortByNewestHandler}> Newest</button>
          <button onClick={sortByOldestHandler}> Oldest</button>
        </div>
      )}
      {questions &&
        questions.sort(questionSorting()).map((question) => (
          <div>
            <h2> {question.title}</h2>
            <h3> Posted by: {question.author.username}</h3>
            <h3> Upvotes : {question.voteCount}</h3>
            <p>{question.text}</p>
            <h3> {question.answers.length} Replies</h3>
            <hr />
          </div>
        ))}
    </Fragment>
  );
};

export default AllQuestions;
