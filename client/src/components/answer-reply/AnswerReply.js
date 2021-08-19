import axios from "axios";

const AnswerReply = (props) => {
  const replyUpVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}/addVote`,
      { vote: 1 }
    );
    props.setQuestion(data);
  };
  const replyDownVoteHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}/addVote`,
      { vote: -1 }
    );
    props.setQuestion(data);
  };

  const deleteHandler = async () => {
    const res = await axios.post(
      `/api/question/${props.questionId}/answer/${props.answerId}/reply/${props.reply._id}`,
      {}
    );
    console.log(res);

    const { data } = await axios.get(`/api/question/${props.questionId}`);
    props.setQuestion(data);
  };
  return (
    <div>
      <p> {props.reply.text}</p>
      <h2>{props.reply.voteCount} upvotes</h2>
      <button onClick={replyUpVoteHandler}> UpVote</button>
      <button onClick={replyDownVoteHandler}> DownVote</button>
      <button onClick={deleteHandler}> Delete</button>
    </div>
  );
};

export default AnswerReply;
