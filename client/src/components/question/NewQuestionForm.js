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
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    onBlur: titleOnBlur,
    onChange: titleOnChange,
  } = useInput((title) => title.trim() !== "");

  const {
    value: question,
    valueIsValid: questionIsValid,
    hasError: questionHasError,
    onBlur: questionOnBlur,
    onChange: questionOnChange,
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
      <div className="justify-content-center d-flex align-items-center vh-100 flex-column">
        <h1>Add a new Question</h1>
        <div className="w-50 border d-flex flex-column mx-auto p-3">
          <form onSubmit={formSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title{" "}
              </label>
              <input
                type="text"
                id="title"
                onChange={titleOnChange}
                onBlur={titleOnBlur}
                className="form-control"
              />
              {titleHasError && (
                <p className={classes.parainvalid}>Title can't be empty</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Question" className="form-label">
                Question{" "}
              </label>
              <input
                type="text"
                id="Question"
                onChange={questionOnChange}
                onBlur={questionOnBlur}
                className="form-control"
              />
              {questionHasError && (
                <p className={classes.parainvalid}>Question can't be empty</p>
              )}
            </div>

            <label className="form-label">Add Tags</label>
            <TagComponent tags={[]} />

            {formIsValid && (
              <button className="btn btn-success mt-3 w-100">Submit</button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewQuestionForm;
