import React, {Component} from "react";
import classnames from "classnames";
import { createNewUser } from "../../actions/securityActions";
import ReactDOM from 'react-dom';

class RegisterForm extends Component{
    constructor(){
        super();

        this.state = {
            username: "",
            address: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            abn: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState ({
                errors: nextProps.errors
            });

        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            abn: this.state.abn,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        createNewUser(newUser, this.props.history);
    }

    onChange(e) {
        if(e.target.value.trim === ""){

        }
        this.setState({ [e.target.name]: e.target.value });
    }

    //ReactDOM.findDOMNode(this).getElementsByClassName('snap')

    userInputClassName = () => {
        return
    }

    render() {
        const {errors} = this.state;
        return (
            <form action="http://localhost:8080/api/users/login" method="post">
                <div className="form-group">
                    <input
                        type="text"
                        className= {classnames("form-control inputName-name form-control-lg", {
                            "is-invalid": errors.name
                        }) }
                        placeholder="Name"
                        name="name"
                        value= {this.state.name}
                        required
                    />
                    {errors.name && (
                        <div className= "invalid-feedback">{errors.name}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control inputName-username form-control-lg"
                        placeholder="Username"
                        name="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control inputName-address form-control-lg"
                        placeholder="Address"
                        name="address"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control inputName-phoneNumber form-control-lg"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        required
                    />
                </div>

                {this.props.userType == "2" &&
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control inputName-abn form-control-lg"
                        placeholder="Enter ABN"
                        name="abn"
                        required
                    />
                </div>}

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control inputName-password form-control-lg"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control inputName-password2 form-control-lg"
                        placeholder="Confirm Password"
                        name="password2"
                        required
                    />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />

            </form>
        )
    }
}

export default RegisterForm;