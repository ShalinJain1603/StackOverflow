import axios from "axios";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";

const AddAnswerReply = (props) => {
  const history = useHistory();
  const {
    value: reply,
    isTouched: replyIsTouched,
    valueIsValid: replyIsValid,
    hasError: replyHasError,
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
    }
  };
  return (
    <form onSubmit={replySubmitHandler}>
      <textarea
        onChange={replyOnChange}
        onBlur={replyOnBlur}
        value={reply}
      ></textarea>
      <button> Post</button>
    </form>
  );
};

export default AddAnswerReply;
