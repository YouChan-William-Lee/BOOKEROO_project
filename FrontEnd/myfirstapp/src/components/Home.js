import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Person from './Persons/Person'
import CreateUserButton from './Persons/CreateUserButton';
import store from "../store";
import { SET_CURRENT_USER } from "../actions/types";
import { logout } from "../actions/securityActions";
import ShowAllBooks from "./Books/ShowAllBooks";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token)

            if (decoded_token.username) {
                this.setState({ isUserLoggedIn: true })
            } else {
                this.setState({ isUserLoggedIn: false })
            }
        } else {
            this.setState({ isUserLoggedIn: false })
        }
    }

    componentWillReceiveProps() {
    }


    render() {
        return (
            <div>
                <ShowAllBooks />
            </div>

        );
    }
}
export default Home;