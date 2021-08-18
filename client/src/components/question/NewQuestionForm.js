import axios from "axios";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import TagComponent from "../tags";
import Modal from "../UI/Modal";
import classes from "./NewQuestionForm.module.css";

const NewQuestionForm = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const {
    value: title,
    isTouched: titleIsTouched,
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    onBlur: titleOnBlur,
    onChange: titleOnChange,
    reset: titleReset,
  } = useInput((title) => title.trim() !== "");

  const {
    value: question,
    isTouched: questionIsTouched,
    valueIsValid: questionIsValid,
    hasError: questionHasError,
    onBlur: questionOnBlur,
    onChange: questionOnChange,
    reset: questionReset,
  } = useInput((question) => question.trim !== "");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tags = document.querySelectorAll(".react-tags__selected-tag-name");
    const names = [];
    for (const tag of tags) {
      names.push(tag.innerText);
    }
    const data = {
      title: title,
      text: question,
      tags: names,
    };
    const res = await axios.post("/api/question/new", data);
    setShowModal(true);
    //console.log(res);
  };
  const closeModal = () => {
    setShowModal(false);
    history.push("/questions");
  };

  const successMessage = (
    <div>
      <h2> Question Added :)</h2>
      <button onClick={closeModal}> Close</button>
    </div>
  );

  const formIsValid = titleIsValid && questionIsValid;
  const titleClass = `${classes.control} ${
    titleHasError ? classes.invalid : ""
  }`;
  const questionClass = `${classes.control} ${
    questionHasError ? classes.invalid : ""
  }`;

  return (
    <Fragment>
      {showModal && <Modal onClick={closeModal}>{successMessage}</Modal>}
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <div>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            onChange={titleOnChange}
            onBlur={titleOnBlur}
          />
          {titleHasError && (
            <p className={classes.parainvalid}>Title can't be empty</p>
          )}
        </div>
        <div>
          <label htmlFor="Question">Question </label>
          <input
            type="text"
            id="Question"
            onChange={questionOnChange}
            onBlur={questionOnBlur}
          />
          {questionHasError && (
            <p className={classes.parainvalid}>Question can't be empty</p>
          )}
        </div>

        <TagComponent tags={[]} />

        {formIsValid && <button className={classes.submit}>Submit</button>}
      </form>
    </Fragment>
  );
};

export default NewQuestionForm;
