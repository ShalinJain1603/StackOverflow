import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = async () => {
    const user = await axios.get('./api/profile');

    return <Fragment>
        <h2>{user.firstname} {user.lastname}</h2>
        <h3> {user.batch} batch</h3>
        <h3> {user.department}</h3>
    </Fragment>
}

export default UserProfile;