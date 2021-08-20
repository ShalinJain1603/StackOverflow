import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";

const AddAnswer = (props) => {
  const history = useHistory();
  const {
    value: answer,
    isTouched: answerIsTouched,
    valueIsValid: answerIsValid,
    hasError: answerHasError,
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
    }
  };
  return (
    <form onSubmit={addAnswerHandler}>
      <div>
        <label htmlFor="answer">Add an answer </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onBlur={answerOnBlur}
          onChange={answerOnChange}
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default AddAnswer;
