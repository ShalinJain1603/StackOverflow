import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import TagComponent from "../tags";
import Modal from "../UI/Modal";
import classes from "./NewQuestionForm.module.css";
const EditQuestionForm = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTags, setcurrentTags] = useState(null);
  const [status, setStatus] = useState("");
  const { questionId } = useParams();
  const history = useHistory();

  const {
    value: title,
    valueIsValid: titleIsValid,
    onBlur: titleOnBlur,
    onChange: titleOnChange,
    onset: titlePreset,
  } = useInput((title) => title.trim() !== "");

  const {
    value: question,
    valueIsValid: questionIsValid,
    hasError: questionHasError,
    onBlur: questionOnBlur,
    onChange: questionOnChange,
    onset: questionPreset,
  } = useInput((question) => question.trim !== "");

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get(`/api/question/${questionId}`);
      titlePreset(data.title);
      questionPreset(data.text);
      const tags = data.tags.map((tag) => ({ name: tag }));
      setcurrentTags(tags);
    };

    fetchQuestion();
  }, [questionId]);

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
    const res = await axios.post(`/api/question/${questionId}/edit`, data);
    setShowModal(true);
    console.log(res);
    setStatus(res.data);
  };

  const closeModal = () => {
    setShowModal(false);
    history.push(`/questions/${questionId}`);
  };
  const successMessage = (
    <div>
      <h2>{status}</h2>
      <button onClick={closeModal}> Close</button>
    </div>
  );

  const formIsValid = titleIsValid && questionIsValid;

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
            value={title}
          />
        </div>
        <div>
          <label htmlFor="Question">Question </label>
          <input
            type="text"
            id="Question"
            onChange={questionOnChange}
            onBlur={questionOnBlur}
            value={question}
          />
          {questionHasError && (
            <p className={classes.parainvalid}>Question can't be empty</p>
          )}
        </div>
        {currentTags && <TagComponent tags={currentTags} />}

        {formIsValid && <button className={classes.submit}>Edit</button>}
      </form>
    </Fragment>
  );
};

export default EditQuestionForm;
