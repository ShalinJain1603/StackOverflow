import axios from "axios";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "../UI/Modal";

const Answer = (props) => {
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
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="col-11">
            <h3>{props.answer.text}</h3>
            <div className="d-inline-block">
              {showButton && (
                <button
                  onClick={DeleteHandler}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              )}
              <p className="text-muted d-inline-block ms-3">
                {" "}
                Answered by - {props.answer.author.firstname}
                <p> posted {props.timeSince} ago</p>
              </p>
            </div>
          </div>
          <div className="col-1 border-start mt-2">
            <div className="text-align-center align-items-center d-flex flex-column">
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>Upvote</Tooltip>}
              >
                <span onClick={answerUpVoteHandler}>
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
              <h5> {props.answer.voteCount}</h5>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Downvote</Tooltip>}
              >
                <span onClick={answerDownVoteHandler}>
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
          </div>
        </div>
      </div>
      {showLoginModal && <Modal>{loginPrompt}</Modal>}
    </div>
  );
};

export default Answer;
