import React, { useState } from 'react';
import classes from './NewQuestionForm.module.css';
import useInput from '../../hooks/use-input';

const NewQuestionForm = (props) => {
    const {
        value: title,
        isTouched: titleIsTouched,
        valueIsValid: titleIsValid,
        hasError: titleHasError,
        onBlur: titleOnBlur,
        onChange: titleOnChange,
        reset: titleReset
    } = useInput(title => title.trim() !== "");

    const {
        value: question,
        isTouched: questionIsTouched,
        valueIsValid: questionIsValid,
        hasError: questionHasError,
        onBlur: questionOnBlur,
        onChange: questionOnChange,
        reset: questionReset
    } = useInput(question => question.trim !== "");

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(title, question);
        // questionSubmitHandler function to be added
        // props.questionSubmitHandler({
        //     title,
        //     question
        // });
    }

    const formIsValid = titleIsValid && questionIsValid;
    const titleClass = `${classes.control} ${titleHasError ? classes.invalid : ""}`;
    const questionClass = `${classes.control} ${questionHasError ? classes.invalid : ""}`;
    return <form onSubmit={formSubmitHandler} className={classes.form}>
        <div>
            <label htmlFor='title'>Title </label>
            <input type='text' id='title' onChange={titleOnChange} onBlur={titleOnBlur} />
            {titleHasError && <p className={classes.parainvalid}>Title can't be empty</p>}
        </div>
        <div>
            <label htmlFor='Question'>Question </label>
            <input type='text' id='Question' onChange={questionOnChange} onBlur={questionOnBlur} />
            {questionHasError && <p className={classes.parainvalid}>Question can't be empty</p>}
        </div>
        {formIsValid && <button className={classes.submit}>
            Submit
        </button>}
    </form>
}

export default NewQuestionForm;