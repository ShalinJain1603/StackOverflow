import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Badge } from "reactstrap";
import AddAnswerReply from "../answer-reply/AddAnswerReply";
import AnswerReply from "../answer-reply/AnswerReply";
import AllAnswerReplies from "../answer-reply/AllAnswerReplies";
import AddAnswer from "../answer/AddAnswer";
import Answer from "../answer/Answer";
import Modal from "../UI/Modal";

const QuestionDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState(null);
  const { questionId } = useParams();
  const [answerSortType, setAnswersSortType] = useState("Oldest");
  const history = useHistory();
  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get(`/api/question/${questionId}`);
      setQuestion(data);
    };

    fetchQuestion();
  }, []);

  const upVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/question/${questionId}/vote`, {
      vote: 1,
    });
    setQuestion(data);
  };
  const downVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/question/${questionId}/vote`, {
      vote: -1,
    });
    setQuestion(data);
  };

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

  const ReDirectHandler = () => {
    history.push(`/questions/${questionId}/edit`);
  };

  const DeleteHandler = async () => {
    const res = await axios.post(`/api/question/${questionId}/delete`);
    if (res.data === "Deleted Question") {
      setShowModal(true);
    } else {
      console.log(res.data);
    }
  };

  const ResolveHandler = async () => {
    const res = await axios.post(`/api/question/${questionId}/resolve`);
    console.log(res.data);
    if (res.data === "Success") {
      const { data } = await axios.get(`/api/question/${questionId}`);
      setQuestion(data);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    history.push("/questions");
  };

  const successMessage = (
    <div>
      <h2> Question Deleted </h2>
      <button onClick={closeModal}> Close</button>
    </div>
  );

  return (
    <Fragment>
      {showModal && <Modal onClick={closeModal}>{successMessage}</Modal>}
      {!question && (
        <p className="m-3">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </p>
      )}
      {question && (
        <div>
          <h1 className="d-inline-block"> {question.title} </h1>
          {question.tags.map((tag) => (
            <Badge className="bg-warning mx-1 mb-1 text-dark">{tag}</Badge>
          ))}
          {!question.resolved && <span className="btn btn-success">Open</span>}
          {question.resolved && <span className="btn btn-danger">Closed</span>}
          <br />
          <button onClick={ReDirectHandler}>Edit</button>
          <button onClick={DeleteHandler}>Delete</button>
          <button onClick={ResolveHandler}>Resolve</button>
          <br />
          {question.author.firstname}
          <p> {question.text}</p>
          <h2>
            {" "}
            {question.voteCount} Vote
            {Math.abs(question.voteCount) === 1 ? "" : "s"}
          </h2>
          <button onClick={upVoteHandler}>Upvote </button>
          <button onClick={downVoteHandler}>Downvote </button>
        </div>
      )}
      {question && !question.resolved && (
        <AddAnswer questionId={questionId} setQuestion={setQuestion} />
      )}
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
            <Answer
              answer={answer}
              questionId={questionId}
              setQuestion={setQuestion}
            />
            {!question.resolved && (
              <AddAnswerReply
                questionId={questionId}
                answerId={answer._id}
                setQuestion={setQuestion}
              />
            )}
            { question &&
              answer.replies.length && (<AllAnswerReplies >

                { answer.replies
                  .sort(answerSorting())
                  .map((reply) => (
                    <AnswerReply
                      reply={reply}
                      questionId={questionId}
                      answerId={answer._id}
                      setQuestion={setQuestion}
                    />
                  ))}
              </AllAnswerReplies>)}
          </div>
        ))}
    </Fragment>
  );
};

export default QuestionDetail;
