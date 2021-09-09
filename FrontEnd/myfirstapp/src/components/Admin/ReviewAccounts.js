import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createPerson} from "../../actions/personActions";

class ReviewAccounts extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render(){
        return (
        <div className="d-flex flex-column">

        </div>
        );

    }

}

ReviewAccounts.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(
    null,
    { createPerson }
)(ReviewAccounts);