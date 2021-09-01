import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Logout extends Component {

    render() {
        this.props.logout();
        return (
            <div>

            </div>
        );
    }
}
Logout.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logout }
)(Logout);