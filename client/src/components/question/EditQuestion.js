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
      <div className="justify-content-center d-flex align-items-center vh-100 flex-column">
        <h1>Edit Question</h1>
        <div className="w-50 border d-flex flex-column mx-auto p-3">
          <form onSubmit={formSubmitHandler}>
            <div>
              <label htmlFor="title" className="form-label">
                Title{" "}
              </label>
              <input
                type="text"
                id="title"
                onChange={titleOnChange}
                onBlur={titleOnBlur}
                value={title}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="Question" className="form-label">
                Question{" "}
              </label>
              <input
                type="text"
                id="Question"
                onChange={questionOnChange}
                onBlur={questionOnBlur}
                value={question}
                className="form-control"
              />
              {questionHasError && (
                <p className={classes.parainvalid}>Question can't be empty</p>
              )}
            </div>

            <label className="form-label">Add Tags</label>
            {currentTags && <TagComponent tags={currentTags} />}

            {formIsValid && (
              <button className="btn btn-success mt-3 w-100">Edit</button>
            )}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditQuestionForm;
