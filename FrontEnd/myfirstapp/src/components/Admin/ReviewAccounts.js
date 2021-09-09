import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { getPersons } from "../../actions/personActions";
import { getPerson } from "../../actions/personActions";

class ReviewAccounts extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            phoneNumber: "",
            userRole: "",
            ABN:"",
            pending: false,
        };
    }

    componentDidMount() {
        this.props.getPersons();
    }

    render(){
        return (
            <div className="Review">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Pending accounts</h1>
                            <br/>
                            <br/>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Type of User</th>
                                    <th scope="col">ABN</th>
                                    <th scope="col">Accept</th>
                                    <th scope="col">Reject</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

ReviewAccounts.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(
    null,
    { getPersons, getPerson },
)(ReviewAccounts);