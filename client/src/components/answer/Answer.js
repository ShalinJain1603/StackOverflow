import axios from "axios";
import { useHistory } from "react-router-dom";
const Answer = (props) => {
  const history = useHistory();
  const answerUpVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}/addVote`,
      { vote: 1 }
    );
    props.setQuestion(data);
  };
  const answerDownVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}/addVote`,
      { vote: -1 }
    );
    props.setQuestion(data);
  };
  const DeleteHandler = async () => {
    const res = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answer._id}`,
      {}
    );
    console.log(res.data);
    const { data } = await axios.get(`/api/question/${props.questionId}`);
    props.setQuestion(data);
  };
  return (
    <div>
      <h1> {props.answer.author.firstname}</h1>
      <h3>{props.answer.text}</h3>
      <h2> {props.answer.voteCount}</h2>
      <button onClick={answerUpVoteHandler}>UpVote</button>
      <button onClick={answerDownVoteHandler}>DownVote</button>
      <button onClick={DeleteHandler}>Delete</button>
    </div>
  );
};

export default Answer;
