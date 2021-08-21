import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import classes from "./RegisterUser.module.css";
const EditUserForm = (props) => {
  const history = useHistory();
  const formData = new FormData();
  const [image, setImage] = useState(null);
  const {
    value: firstname,
    valueIsValid: firstnameIsValid,
    hasError: firstnameHasError,
    onBlur: firstnameOnBlur,
    onChange: firstnameOnChange,
    onset: firstnameSet,
  } = useInput((firstname) => firstname.trim() !== "");

  const {
    value: lastname,
    valueIsValid: lastnameIsValid,
    hasError: lastnameHasError,
    onBlur: lastnameOnBlur,
    onChange: lastnameOnChange,
    onset: lastnameSet,
  } = useInput((lastname) => lastname.trim !== "");

  const {
    value: batch,
    valueIsValid: batchIsValid,
    onBlur: batchOnBlur,
    onChange: batchOnChange,
    onset: batchSet,
  } = useInput((batch) => batch.trim !== "");

  const {
    value: hostel,
    valueIsValid: hostelIsValid,
    onBlur: hostelOnBlur,
    onChange: hostelOnChange,
    onset: hostelSet,
  } = useInput((hostel) => hostel.trim !== "");

  const {
    value: department,
    valueIsValid: departmentIsValid,
    onBlur: departmentOnBlur,
    onChange: departmentOnChange,
    onset: departmentSet,
  } = useInput((department) => department.trim !== "");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/profile");
      departmentSet(data.department);
      hostelSet(data.hostel);
      firstnameSet(data.firstname);
      lastnameSet(data.lastname);
      batchSet(data.batch);
    };
    getUser();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    formData.append("image", image);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("batch", batch);
    formData.append("hostel", hostel);
    formData.append("department", department);
    const res = await axios.post("/api/profile/edit", formData);
    history.push("/user");
  };
  const imageChangeHandler = ({ target }) => {
    setImage(target.files[0]);
  };

  const formIsValid =
    firstnameIsValid &&
    lastnameIsValid &&
    batchIsValid &&
    hostelIsValid &&
    departmentIsValid;

  return (
    <div className="d-flex flex-column vh-100 justify-content-center w-50 mx-auto">
      <h1>Edit your details</h1>
      <form
        onSubmit={formSubmitHandler}
        className={classes.form}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label className="form-label" htmlFor="firstname">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            id="firstname"
            onChange={firstnameOnChange}
            onBlur={firstnameOnBlur}
            value={firstname}
          />
          {firstnameHasError && (
            <p className={classes.parainvalid}>firstname can't be empty</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastname" className="form=label">
            Last Name{" "}
          </label>
          <input
            type="text"
            id="lastname"
            onChange={lastnameOnChange}
            onBlur={lastnameOnBlur}
            className="form-control"
            value={lastname}
          />
          {lastnameHasError && (
            <p className={classes.parainvalid}>lastname can't be empty</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="batch" className="form=label">
            Batch
          </label>
          <select
            id="batch"
            onChange={batchOnChange}
            onBlur={batchOnBlur}
            className="form-control"
            value={batch}
          >
            <option value="">--Select your year--</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2021">2022</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hostel" className="form-label">
            Hostel
          </label>
          <select
            id="hostel"
            onChange={hostelOnChange}
            onBlur={hostelOnBlur}
            className="form-control"
            value={hostel}
          >
            <option value="">--Select your hostel--</option>
            <option value="Brahmaputra">Brahmaputra</option>
            <option value="Umiam">Umiam</option>
            <option value="Kameng">Kameng</option>
            <option value="Dihing">Dihing</option>
            <option value="Dhansiri">Dhansiri</option>
            <option value="Manas">Manas</option>
            <option value="Subhansiri">Subhansiri</option>
            <option value="Siang">Siang</option>
            <option value="Lohit">Lohit</option>
            <option value="Kapili">Kapili</option>
            <option value="Disang">Disang</option>
            <option value="Dibang">Dibang</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            id="department"
            onChange={departmentOnChange}
            onBlur={departmentOnBlur}
            className="form-control"
            value={department}
          >
            <option value="">--Select your department--</option>
            <option value="Chemical">Chemical</option>
            <option value="CSE">CSE</option>
            <option value="CST">CST</option>
            <option value="BSBE">BSBE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Design">Design</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="EP">EP</option>
          </select>
        </div>
        <label htmlFor="image" className="form-label">
          Profile Picture
        </label>
        <input
          type="file"
          id="image"
          onChange={imageChangeHandler}
          className="form-control"
        />
        {formIsValid && (
          <button className="btn btn-success mt-3 w-100">Edit</button>
        )}
      </form>
    </div>
  );
};

export default EditUserForm;
