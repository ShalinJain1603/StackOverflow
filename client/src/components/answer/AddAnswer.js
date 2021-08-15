import React, { useState } from 'react';
import classes from './AddAnswer.module.css';
import axios from 'axios';
import useInput from '../../hooks/use-input';
import { useHistory } from 'react-router-dom';

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
        console.log(answer, "answer");
        const ans = { text: answer };
        const res = await axios.post(`/api/question/${props.questionId}/answer`, ans);
        console.log(res);
        history.push(`/questions/${props.questionId}`);
    }
    return <form onSubmit={addAnswerHandler}>
        <div>
            <label htmlFor='answer'>Add an answer </label>
            <input type='text' id='answer' onBlur={answerOnBlur} onChange={answerOnChange} />
        </div>
        <button>
            Submit
        </button>
    </form>
}

export default AddAnswer;