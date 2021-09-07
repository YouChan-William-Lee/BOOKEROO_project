import React from 'react'
import {link, Link} from "react-router-dom";

 const CreateUserButton=() => {
    return (
        <React.Fragment>
        <Link to="/register"
        className="btn btn-lg btn-info">
        Create a user
        </Link>
        </React.Fragment>
    )
};
export default CreateUserButton;