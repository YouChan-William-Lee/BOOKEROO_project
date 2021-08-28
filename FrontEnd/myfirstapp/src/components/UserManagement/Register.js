import React, { Component } from "react";
// import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import RegisterForm from "./RegisterForm";
import "../../Stylesheets/Register.css";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      userType: "1"
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <Link className="lead mb-2" to="/login">Already signed up? Login?</Link>
              <div className="d-flex justify-content-center my-3">
                <form action="create-profile.html">
                  <select className="form-select bg-primary text-white p-2" name="userType" onChange={this.onChange}>
                    <option value="1" selected>Public User</option>
                    <option value="2" >Publisher/Shop Owner</option>
                  </select>
                </form>
              </div>
              <RegisterForm userType={this.state.userType} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;