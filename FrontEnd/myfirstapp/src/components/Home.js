import React, { Component } from 'react'
import Person from './Persons/Person'
import CreateUserButton from './Persons/CreateUserButton';
import jwt_decode from "jwt-decode";
import store from "../store";
import {SET_CURRENT_USER} from "../actions/types";
import {logout} from "../actions/securityActions";

class Home extends Component {
    render() {
        return (
            <div className="Persons">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Persons</h1>
                            <Person/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;