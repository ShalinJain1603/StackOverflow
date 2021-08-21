import axios from "axios";
import { React, useState } from "react";
import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
const AddAnswer = (props) => {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    value: answer,
    onBlur: answerOnBlur,
    onChange: answerOnChange,
    reset: answerReset,
  } = useInput((answer) => answer.trim() !== "");

  const addAnswerHandler = async (event) => {
    event.preventDefault();
    const ans = { text: answer };
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer`,
      ans
    );
    answerReset();
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
    <form onSubmit={addAnswerHandler}>
      {showLoginModal && <Modal>{loginPrompt}</Modal>}
      <div className="d-flex">
        <label htmlFor="answer">Add an answer </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onBlur={answerOnBlur}
          onChange={answerOnChange}
          className="flex-fill ms-1"
        />
        <button className="btn btn-sm btn-success">Submit</button>
      </div>
    </form>
  );
};

export default AddAnswer;
