import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Stylesheets/Login.css"

/* This is a login page where the user can input their email address and their password
   to log into BOOKERO. User can also navigate to sign up page if they do not have an
   account yet or go to the forget password page if they forgot their password
*/
class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto blue-background login-main">
              <h1 className="display-4 text-center mb-4">Log In</h1>
              <form action="http://localhost:8080/api/users/login" method="post">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div class="external-links">
                <Link to="/register">Sign Up</Link>
                <Link to="/forget-password">Forget Password</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;