import axios from "axios";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Modal from "../UI/Modal";
const Answer = (props) => {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    const isAuthor = async () => {
      const { data: isAuthorized } = await axios.get(
        `/api/question/${props.questionId}/answer/${props.answer._id}/isValid`
      );
      if (isAuthorized === "Allowed") {
        setShowButton(true);
      }
    };
    isAuthor();
  }, []);

  const answerUpVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}/addVote`,
      { vote: 1 }
    );
    if (data !== "You must login first") {
      props.setQuestion(data);
    } else {
      setShowLoginModal(true);
    }
  };
  const answerDownVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}/addVote`,
      { vote: -1 }
    );
    if (data !== "You must login first") {
      props.setQuestion(data);
    } else {
      setShowLoginModal(true);
    }
  };
  const DeleteHandler = async () => {
    const res = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}`,
      {}
    );
    console.log(res.data);
    const { data } = await axios.get(`/api/question/${props.questionId}`);
    if (data !== "You must login first") {
      props.setQuestion(data);
    }
  };

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
  return (
    <div>
      {showLoginModal && <Modal>{loginPrompt}</Modal>}
      <h1> {props.answer.author.firstname}</h1>
      <h3>{props.answer.text}</h3>
      <div className="text-align-center align-items-center d-flex flex-column w-25">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Upvote</Tooltip>}
        >
          <span onClick={answerUpVoteHandler} className="ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="green"
              class="bi bi-caret-up-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z" />
            </svg>
          </span>
        </OverlayTrigger>
        <h2>
          {" "}
          {props.answer.voteCount} Vote
          {Math.abs(props.answer.voteCount) === 1 ? "" : "s"}
        </h2>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Downvote</Tooltip>}
        >
          <span onClick={answerDownVoteHandler} className="ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="red"
              class="bi bi-caret-down-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z" />
            </svg>
          </span>
        </OverlayTrigger>
      </div>
      {showButton && <button onClick={DeleteHandler}>Delete</button>}
    </div>
  );
};

export default Answer;
