import React, {Component} from 'react';
import CreateUserButton from "../Persons/CreateUserButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReviewUsersButton from "../Persons/ReviewUsersButton";

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            message: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    render() {
        return (
            <div className="Persons">
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Admin</h1>
                            <br />
                            <div className="d-flex flex-row justify-content-center">
                            <CreateUserButton />
                            <br />
                            <ReviewUsersButton />
                            </div>
                            <br />
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Admin.propType = {

};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {}
)(Admin);