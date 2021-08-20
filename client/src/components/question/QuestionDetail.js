import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Badge } from "reactstrap";
import AddAnswerReply from "../answer-reply/AddAnswerReply";
import AllAnswerReplies from "../answer-reply/AllAnswerReplies";
import AnswerReply from "../answer-reply/AnswerReply";
import AddAnswer from "../answer/AddAnswer";
import Answer from "../answer/Answer";
import Modal from "../UI/Modal";

const QuestionDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalFlash, setShowModalFlash] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [question, setQuestion] = useState(null);
  const { questionId } = useParams();
  const [answerSortType, setAnswersSortType] = useState("Oldest");
  const [upvote, setUpvote] = useState("gray");
  const [downvote, setDownVote] = useState("gray");
  const [showButtons, setShowButtons] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get(`/api/question/${questionId}`);
      setQuestion(data);
      const { data: checkVote } = await axios.get(
        `/api/question/${questionId}/checkVote`
      );
      if (checkVote.length !== 0) {
        if (checkVote[0].vote === 1) {
          setUpvote("green");
        } else if (checkVote[0].vote === -1) {
          setDownVote("red");
        }
      }
      const { data: isAuthorized } = await axios.get(
        `/api/question/${questionId}/isAuthor`
      );
      if (isAuthorized === "Allowed") {
        setShowButtons(true);
      }
    };

    fetchQuestion();
  }, []);

  const upVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/question/${questionId}/vote`, {
      vote: 1,
    });
    if (data !== "You must login first") {
      setDownVote("gray");
      setUpvote("green");
      setQuestion(data);
    } else {
      setShowLoginModal(true);
    }
  };
  const downVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(`/api/question/${questionId}/vote`, {
      vote: -1,
    });
    if (data !== "You must login first") {
      setDownVote("red");
      setUpvote("gray");
      setQuestion(data);
    } else {
      setShowLoginModal(true);
    }
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

  const DeleteModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const DeleteHandler = async () => {
    const res = await axios.post(`/api/question/${questionId}/delete`);
    setShowModal(false);
    setShowModalFlash(true);
  };

  const promptMessage = (
    <div>
      <h2> Are you sure you want to delete ?</h2>
      <button onClick={DeleteHandler}> Yes </button>
      <button onClick={closeModal}> No </button>
    </div>
  );

  const closeModalFlash = () => {
    setShowModalFlash(false);
    history.push("/questions");
  };

  const successMessage = (
    <div>
      <h2> Question Deleted :(</h2>
      <button onClick={closeModalFlash}> Close</button>
    </div>
  );

  const closeModalLogin = () => {
    setShowLoginModal(false);
  };

  const loginPrompt = (
    <div>
      <h2>
        You must login first!!
        <button
          onClick={closeModalLogin}
          className="btn btn-sm btn-danger ms-5"
        >
          Close
        </button>
      </h2>

      <a
        className="btn btn-info me-auto"
        href="http://localhost:4000/auth/outlook"
      >
        Login with outlook
      </a>
    </div>
  );

  const ResolveHandler = async () => {
    const res = await axios.post(`/api/question/${questionId}/resolve`);
    console.log(res.data);
    if (res.data === "Success") {
      const { data } = await axios.get(`/api/question/${questionId}`);
      setQuestion(data);
    }
  };

  return (
    <Fragment>
      {showModal && <Modal>{promptMessage}</Modal>}
      {showModalFlash && (
        <Modal onClick={closeModalFlash}>{successMessage}</Modal>
      )}
      {showLoginModal && <Modal>{loginPrompt}</Modal>}
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
          {showButtons && (
            <div>
              <button onClick={ReDirectHandler}>Edit</button>
              <button onClick={DeleteModal}>Delete</button>
              <button onClick={ResolveHandler}>Resolve</button>
              <br />
            </div>
          )}

          {question.author.firstname}
          <p> {question.text}</p>
          <div className="text-align-center align-items-center d-flex flex-column w-25">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Upvote</Tooltip>}
            >
              <span onClick={upVoteHandler} className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill={upvote}
                  class="bi bi-caret-up-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z" />
                </svg>
              </span>
            </OverlayTrigger>
            <h2>
              {" "}
              {question.voteCount} Vote
              {Math.abs(question.voteCount) === 1 ? "" : "s"}
            </h2>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Downvote</Tooltip>}
            >
              <span onClick={downVoteHandler} className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill={downvote}
                  class="bi bi-caret-down-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z" />
                </svg>
              </span>
            </OverlayTrigger>
          </div>
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
            {question && answer.replies.length && (
              <AllAnswerReplies>
                {answer.replies.sort(answerSorting()).map((reply) => (
                  <AnswerReply
                    reply={reply}
                    questionId={questionId}
                    answerId={answer._id}
                    setQuestion={setQuestion}
                  />
                ))}
              </AllAnswerReplies>
            )}
          </div>
        ))}
    </Fragment>
  );
};

export default QuestionDetail;
