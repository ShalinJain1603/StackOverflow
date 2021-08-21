import axios from "axios";
import { React, useState } from "react";
import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";

const AddAnswerReply = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    value: reply,
    valueIsValid: replyIsValid,
    onBlur: replyOnBlur,
    onChange: replyOnChange,
    reset: replyReset,
  } = useInput((reply) => reply.trim() !== "");
  const replySubmitHandler = async (event) => {
    event.preventDefault();
    const ans = {
      text: reply,
    };
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply`,
      ans
    );
    replyReset();
    if (data !== "You must login first") {
      props.setQuestion(data);
    } else {
      setShowLoginModal(true);
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
    <form onSubmit={replySubmitHandler}>
      {showLoginModal && <Modal>{loginPrompt}</Modal>}
      <div className="d-flex mt-1">
        <input
          onChange={replyOnChange}
          onBlur={replyOnBlur}
          value={reply}
          id="reply"
          type="text"
          className="flex-fill"
          placeholder="Add a reply"
        />
        {replyIsValid && <button className="btn btn-success btn-sm"> Post</button>}
      </div>
    </form>
  );
};

export default AddAnswerReply;
