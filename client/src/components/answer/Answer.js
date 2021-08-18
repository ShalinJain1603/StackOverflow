import { Fragment } from 'react';
import axios from 'axios';

const Answer = (props) => {
    const answerUpVoteHandler = async (event) => {
        event.preventDefault();
        const { data } = await axios.post(`/api/question/${props.questionId}/answer/${props.answer._id}/addVote`, { vote: 1 });
        props.setQuestion(data);
    }
    const answerDownVoteHandler = async (event) => {
        event.preventDefault();
        const { data } = await axios.post(`/api/question/${props.questionId}/answer/${props.answer._id}/addVote`, { vote: -1 });
        props.setQuestion(data); console.log("answer upvoted!!!", data);
    }
    return <div>
        <h1> {props.answer.author.firstname}</h1>
        <h3>{props.answer.text}</h3>
        <h2> {props.answer.voteCount}</h2>
        <button onClick={answerUpVoteHandler}>UpVote</button>
        <button onClick={answerDownVoteHandler}>DownVote</button>
    </div>
}

export default Answer;