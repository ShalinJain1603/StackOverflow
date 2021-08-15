import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./UserProfile.module.css";
const UserProfile = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("User");
    const getUser = async () => {
      const { data } = await axios.get("/api/profile");
      console.log(data);
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <Fragment>
      {!user && <p> Loading...</p>}
      {user && (
        <div>
          <img src={user.image} className={classes.letterhead} />
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