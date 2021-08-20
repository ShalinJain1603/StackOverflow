import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./UserProfile.module.css";
const UserProfile = (props) => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    console.log("User");
    const getUser = async () => {
      const { data } = await axios.get("/api/profile");
      setUser(data);
    };
    getUser();
  }, []);

  const ReDirectHandler = () => {
    history.push("/user/edit");
  };

  return (
    <Fragment>
      {!user && <p> Loading...</p>}
      {user && (
        <div>
          <button onClick={ReDirectHandler}>Edit</button>
          <br />
          <img src={user?.image?.url} className={classes.letterhead} />
          <h2>
            {user.firstname} {user.lastname}
          </h2>
          <h3> {user.batch} batch</h3>
          <h3> {user.department}</h3>
          <h3> {user.hostel}</h3>
        </div>
      )}
    </Fragment>
  );
};

export default UserProfile;
