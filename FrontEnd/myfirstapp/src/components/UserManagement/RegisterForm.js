import React, { Component } from "react";
import classnames from "classnames";
import { createNewUser } from "../../actions/securityActions";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactDOM from 'react-dom';

class RegisterForm extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            username: null,
            address: null,
            phoneNumber: null,
            password: null,
            confirmPassword: null,
            abn: null,
            errors: {
                name: '',
                username: '',
                address: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                abn: ''
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        let errors = this.state.errors;

        const value = e.target.value;

        switch (e.target.name) {
            case 'name':
                errors.name = value.length < 1 ? 'Name must be 1 character long.' : '';
                break;

            case 'username':
                console.log(value);
                errors.username = value.length < 5 ? 'Username must be 5 characters long.' : '';
                break;

            case 'address':
                errors.address = value.length > 30 ? 'Address must be less than 30 characters.' : '';
                break;

            case 'password':
                errors.password = value.length < 6 ? 'Password must be at least 6 characters' : '';
                break;

            case 'confirmPassword':
                errors.confirmPassword = value !== this.state.password ? 'Passwords must match' : '';
                break;
            case 'abn':
                errors.abn = value.length === '' ? 'Passwords must match' : '';
                break;
        }

        this.setState({ errors, [e.target.name]: value });
    }

    phoneHandler = (e) => {
        if (e) {
            this.setState({ ["phoneNumber"]: e });
            const errors = this.state.errors;
            if (e.length !== 12) {
                this.setState({ errors, ["phoneNumber"]: "Phone number must be of length 9." });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            username: this.state.username,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            abn: this.state.abn,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        createNewUser(newUser, this.props.history);

    }

    //ReactDOM.findDOMNode(this).getElementsByClassName('snap')

    userInputClassName = () => {
        return
    }

    render() {
        const errors = this.state.errors;
        return (
            <form action="http://localhost:8080/api/users/register" method="post" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control inputName-name form-control-lg", {
                            "is-invalid": errors.name
                        })}
                        placeholder="Name"
                        name="name"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.name.length > 0 && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control inputName-username form-control-lg", { "is-invalid": errors.username })}
                        placeholder="Username"
                        name="username"
                        onChange={this.onChange.bind(this)}
                    />
                    {errors.username.length > 0 && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control inputName-address form-control-lg", { "is-invalid": errors.address })}
                        placeholder="Address"
                        name="address"
                        onChange={this.onChange.bind(this)}
                    />
                    {errors.address.length > 0 && (
                        <div className="invalid-feedback">{errors.address}</div>
                    )}
                </div>
                <div className="form-group">
                    <PhoneInput
                        country="AU"
                        defaultCountry="AU"
                        className="form-control inputName-phoneNumber form-control-lg"
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        onChange={this.phoneHandler.bind(this)} />
                </div>

                {this.props.userType == "2" &&
                    <div className="form-group">
                        <input
                            type="number"
                            className={classnames("form-control inputName-abn form-control-lg", { "is-invalid": errors.abn })}
                            placeholder="Enter ABN"
                            name="abn"
                            value={this.state.abn}
                            onChange={this.onChange.bind(this)}
                        />
                        {errors.abn.length > 0 && (
                            <div className="invalid-feedback">{errors.abn}</div>
                        )}
                    </div>}

                <div className="form-group">
                    <input
                        type="password"
                        className={classnames("form-control inputName-password form-control-lg", { "is-invalid": errors.password })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                    />
                    {errors.password.length > 0 && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={classnames("form-control inputName-password2 form-control-lg", { "is-invalid": errors.confirmPassword })}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChange.bind(this)}
                    />
                    {errors.confirmPassword.length > 0 && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />

            </form>
        )
    }
}

export default RegisterForm;