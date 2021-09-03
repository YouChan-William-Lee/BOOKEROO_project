import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Stylesheets/Login.css";
import { login } from "../../actions/securityActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

/* This is a login page where the user can input their email address and their password
   to log into BOOKERO. User can also navigate to sign up page if they do not have an
   account yet or go to the forget password page if they forgot their password
*/
class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {},
      pending: false,
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // this.setState(Object.keys(nextProps).map(key => { return { key: nextProps[key] } }));
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }

    // if (nextProps.security.validToken) {
    //   this.props.history.push("/home");
    // }

    this.setState({ pending: nextProps.errors.pending ? nextProps.errors.pending : false });

    console.log(this.state.pending, nextProps);
    if (nextProps.security.validToken) {
      this.props.history.push("/home");
    }




  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          {/* {Object.keys(nextProps) !== 0 && (<div class="alert alert-success text-center" role="alert">
            {this.state.message}
          </div>)} */}
          <div className="row">
            <div className="col-md-10 m-auto blue-background login-main">
              <h1 className="display-4 text-center mb-4">Log In</h1>
              {this.state.pending && (
                <div className="alert alert-danger" role="alert">
                  The account is not yet approved!
                </div>
              )}
              {errors.password && (
                <div className="alert alert-danger" role="alert">
                  {errors.password}
                </div>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />

                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <div className="external-links">
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
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);