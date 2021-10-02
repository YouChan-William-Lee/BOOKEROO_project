import { checkPropTypes } from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllSold } from '../../actions/transactionActions';
import PropTypes from "prop-types";
import "../../Stylesheets/TransactionPage.css";

class transactionPage extends Component {
    constructor() {
        super();

        this.state = {
            allTransactions: [],
        };
    }

    componentDidMount() {
        this.props.getAllSold();
    }

    componentWillReceiveProps(nextProps) {
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
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Transaction Date</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Seller/ Donator</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Number of Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log("Transaction Content Here -------->", this.state.allTransactions)}
                            {this.state.allTransactions.map(transaction => (<tr key={transaction}>
                                
                                    <td>{transaction.onSaleDate}</td>
                                    <td>{transaction.bookISBN}</td>
                                    <td>{transaction.sellerUsername}</td>
                                    <td>{transaction.totalPrice}</td>
                                    <td>{transaction.numOfBook}</td>
                                
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
transactionPage.protoType = {
    getTransactions: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect (
    mapStateToProps,
    { getAllSold }
)(transactionPage);