import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardTitle } from "reactstrap";
import { TAGS } from "../constants/tags";
import TagComponent from "../tags";
import classes from "./AllQuestionByTags.module.css";
const AllQuestionsByTag = () => {
  const [questions, setQuestions] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");

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

  const searchByTag = async () => {
    const tags = document.querySelectorAll(".react-tags__selected-tag-name");
    const names = [];
    for (const tag of tags) {
      names.push(tag.innerText);
    }
    const selectedTags = {
      Tags: names,
    };
    const { data } = await axios.post("/api/question/tags", selectedTags);
    setQuestions(data);
  };
  return (
    <Fragment>
      <div className="container">
        <h4>Tags </h4>
        <h5>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </h5>
        <TagComponent tags={[]} />
        <button
          onClick={searchByTag}
          className="btn btn-success btn-sm ms-3 my-2"
        >
          Search
        </button>

        {questions.length !== 0 && (
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
        {questions.length === 0 && (
          <div>
            <h5> All Tags</h5>
            {TAGS.map((tag) => (
              <Badge className="bg-info m-1">{tag.name}</Badge>
            ))}
          </div>
        )}
        {questions &&
          questions.sort(questionSorting()).map((question) => (
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
                    <p> Upvotes : {question.voteCount}</p>
                    <h5>{question.text}</h5>
                    <p> {question.answers.length} Replies</p>
                  </CardBody>
                </Card>
              </div>
            </Link>
          ))}
      </div>
    </Fragment>
  );
};

export default AllQuestionsByTag;
