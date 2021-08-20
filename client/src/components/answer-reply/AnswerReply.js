import axios from "axios";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const AnswerReply = (props) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const isAuthor = async () => {
      const { data: isAuthorized } = await axios.get(
        `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}/isValid`
      );
      if (isAuthorized === "Allowed") {
        setShowButton(true);
      }
    };
    isAuthor();
  }, []);
  const replyUpVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}/addVote`,
      { vote: 1 }
    );
    if (data !== "You must login first") {
      props.setQuestion(data);
    }
  };
  const replyDownVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}/addVote`,
      { vote: -1 }
    );
    if (data !== "You must login first") {
      props.setQuestion(data);
    }
  };

  const deleteHandler = async () => {
    const res = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}`,
      {}
    );
    console.log(res.data);
    const { data } = await axios.get(`/api/question/${props.questionId}`);
    if (data !== "You must login first") {
      props.setQuestion(data);
    }
  };
  return (
    <div>
      <p> {props.reply.text}</p>
      <div className="text-align-center align-items-center d-flex flex-column w-25">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id={`tooltip-top`}>Upvote</Tooltip>}
        >
          <span onClick={replyUpVoteHandler} className="ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          {props.reply.voteCount} Vote
          {Math.abs(props.reply.voteCount) === 1 ? "" : "s"}
        </h2>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Downvote</Tooltip>}
        >
          <span onClick={replyDownVoteHandler} className="ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              class="bi bi-caret-down-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 4a.5.5 0 0 0-.374.832l4 4.5a.5.5 0 0 0 .748 0l4-4.5A.5.5 0 0 0 12 6H4z" />
            </svg>
          </span>
        </OverlayTrigger>
      </div>
      {showButton && <button onClick={deleteHandler}> Delete</button>}
    </div>
  );
};

export default AnswerReply;
