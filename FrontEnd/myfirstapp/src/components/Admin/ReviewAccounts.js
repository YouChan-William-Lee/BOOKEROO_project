import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { getUsers } from "../../actions/personActions";
import { getUser } from "../../actions/personActions";
import axios from "axios";

class ReviewAccounts extends Component {
    constructor() {
        super();

        this.state = {
            allUsers: [],
            allPendingUsers:[]
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/users/allusers").then((response) => response.json()).then(result => {this.setState({allUsers: result})});
        fetch("http://localhost:8080/api/users/allpendingusers").then((response) => response.json()).then(result => {this.setState({allPendingUsers: result})});
    }

    render(){
        return (
            <div className="Review">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            { /* pending accounts */ }

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
                                    {this.state.allPendingUsers.map(user => (
                                        <tr key={user.id}>
                                            <td key={1}>{user.username}</td>
                                            <td key={1}>{user.phoneNumber}</td>
                                            <td key={1}>{user.userRole}</td>
                                            <td key={1}>{user.abn}</td>
                                            <td><input className="btn btn-primary" type="submit" value="Accept" /></td>
                                            <td><input className="btn btn-primary" type="submit" value="Reject" /></td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">

                            { /* all accounts */ }

                            <h1 className="display-4 text-center">All user accounts</h1>
                            <br/>
                            <br/>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Edit</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Type of User</th>
                                    <th scope="col">ABN</th>
                                    <th scope="col">Block</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.allUsers.map(user => (
                                        <tr key={user.id}>
                                            <td><input className="btn btn-primary" type="submit" value="Edit" /></td>
                                            <td key={1}>{user.username}</td>
                                            <td key={1}>{user.fullName}</td>
                                            <td key={1}>{user.phoneNumber}</td>
                                            <td key={1}>{user.userRole}</td>
                                            <td key={1}>{user.abn}</td>
                                            <td><input className="btn btn-primary" type="submit" value="Block" /></td>
                                        </tr>))}
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
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
};

export default connect(
    null,
    { getUsers, getUser },
)(ReviewAccounts);