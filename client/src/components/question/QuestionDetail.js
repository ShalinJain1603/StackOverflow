import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "reactstrap";
import AddAnswerReply from "../answer-reply/AddAnswerReply";
import AddAnswer from "../answer/AddAnswer";
const QuestionDetail = (props) => {
  const [question, setQuestion] = useState(null);
  const { questionId } = useParams();
  const [answerSortType, setAnswersSortType] = useState("Oldest");

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get(`/api/question/${questionId}`);
      setQuestion(data);
      console.log(data);
    };

    fetchQuestion();
  }, []);

  const sortByNewest = () => {
    setAnswersSortType("Newest");
  };
  const sortByOldest = () => {
    setAnswersSortType("Oldest");
  };
  const sortByVotes = () => {
    setAnswersSortType("Votes");
  };
  const answerSorting = () => {
    switch (answerSortType) {
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
  return (
    <Fragment>
      {!question && <p>Loading ...</p>}
      {question && (
        <div>
          <h1 className="d-inline-block"> {question.title} </h1>
          {question.tags.map((tag) => (
            <Badge className="bg-warning mx-1 mb-1 text-dark">{tag}</Badge>
          ))}

          <br />
          {question.author.firstname}
          <p> {question.text}</p>
        </div>
      )}
      {question && <AddAnswer questionId={questionId} />}
      {
        <div>
          <h1> Sort Answers by</h1>
          <button onClick={sortByOldest}> Oldest</button>
          <button onClick={sortByNewest}> Newest</button>
          <button onClick={sortByVotes}> Most Voted</button>
        </div>
      }
      {question &&
        question.answers.length &&
        question.answers.sort(answerSorting()).map((answer) => (
          <div>
            <div>
              <h1> {answer.author.firstname}</h1>
              <h3>{answer.text}</h3>
              <h2> {answer.voteCount}</h2>
            </div>
            <AddAnswerReply questionId={questionId} answerId={answer._id} />
            {question &&
              answer.replies.length &&
              answer.replies.sort(answerSorting()).map((reply) => (
                <div>
                  <p> {reply.text}</p>
                </div>
              ))}
          </div>
        ))}
    </Fragment>
  );
};

export default QuestionDetail;
