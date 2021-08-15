import { useState, Fragment } from 'react';
import useInput from '../../hooks/use-input';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
        const data = {
            text: reply
        }
        const res = await axios.post(`/api/question/${props.questionId}/answer/${props.answerId}/reply`, data);
        console.log(res);
        history.push(`/questions/${props.questionId}`)

    }
    return <form onSubmit={replySubmitHandler}>
        <textarea onChange={replyOnChange} onBlur={replyOnBlur}></textarea>
        <button> Post</button>
    </form>
}

export default AddAnswerReply;