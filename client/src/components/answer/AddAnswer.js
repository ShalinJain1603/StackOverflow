import React, { useState } from 'react';
import classes from './AddAnswer.module.css';

const AddAnswer = () => {
    const addAnswerHandler = (event) => {
        event.preventDefault();
    }
    return <form onSubmit={addAnswerHandler}>
        <div>
            <label htmlFor='answer'>Add an answer </label>
            <input type='text' id='answer' />
        </div>
        <button>
            Submit
        </button>
    </form>
}

export default AddAnswer;