import axios from "axios";
import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import classes from "./RegisterUser.module.css";

const RegisterUserForm = (props) => {
  const history = useHistory();
  const {
    value: firstname,
    valueIsValid: firstnameIsValid,
    hasError: firstnameHasError,
    onBlur: firstnameOnBlur,
    onChange: firstnameOnChange
  } = useInput((firstname) => firstname.trim() !== "");

  const {
    value: lastname,
    valueIsValid: lastnameIsValid,
    hasError: lastnameHasError,
    onBlur: lastnameOnBlur,
    onChange: lastnameOnChange
  } = useInput((lastname) => lastname.trim !== "");

  const {
    value: batch,
    valueIsValid: batchIsValid,
    onBlur: batchOnBlur,
    onChange: batchOnChange
  } = useInput((batch) => batch.trim !== "");

  const {
    value: hostel,
    valueIsValid: hostelIsValid,
    onBlur: hostelOnBlur,
    onChange: hostelOnChange
  } = useInput((hostel) => hostel.trim !== "");

  const {
    value: department,
    valueIsValid: departmentIsValid,
    onBlur: departmentOnBlur,
    onChange: departmentOnChange,
  } = useInput((department) => department.trim !== "");

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      firstname,
      lastname,
      batch,
      hostel,
      department,
    };
    const res = await axios.post("/registerUser", data);
    const navbar = document.querySelector("#navbar_id");
    navbar.toggleAttribute("hidden");
    history.push("/");
  };

  const formIsValid =
    firstnameIsValid &&
    lastnameIsValid &&
    batchIsValid &&
    hostelIsValid &&
    departmentIsValid;

  useEffect(() => {
    const hideNav = () => {
      const navbar = document.querySelector("#navbar_id");
      navbar.setAttribute("hidden", true);
    };
    hideNav();
  });
  return (
    <div className="d-flex flex-column vh-100 justify-content-center w-50 mx-auto">
      <h1>Registration Form</h1>
      <h3>Let us know you a little bit more..</h3>
      <form onSubmit={formSubmitHandler} className={classes.form}>
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
        {formIsValid && (
          <button className="btn btn-success mt-3 w-100">Register</button>
        )}
      </form>
    </div>
  );
};

export default RegisterUserForm;
