import { checkPropTypes } from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transactionActions';
import PropTypes from "prop-types";

class transactionHistory extends Component {
    constructor() {
        super();

        this.state = {
            allTransactions: []
        };
    }

    componentDidMount() {
        this.props.getTransactions();
    }

    componentWillReceiveProps(nextProps) {
        // It is still called bookErrors as per the reducer
        this.setState({allTransactions: nextProps.errors.bookErrors});
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row mt-5 mb-2 h-100">
                        <div className="col">
                            <div className="row">
                                <h1 className="display-4">Transaction History</h1> 
                            </div>
                        </div>
                    </div>
                    
                    {/* Transaction history table */}



                </div>
            </div>
        )
    }
}
transactionHistory.protoType = {
    getTransactions: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect (
    mapStateToProps,
    { getTransactions }
)(transactionHistory);