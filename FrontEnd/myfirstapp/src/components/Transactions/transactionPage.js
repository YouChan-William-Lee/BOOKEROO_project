import { checkPropTypes } from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    rejectPendingTransaction,
    approvePendingTransaction,
    requestRefundTransaction,
    getAllTransactions,
    getTransactionsFor
} from '../../actions/transactionActions';
import PropTypes from "prop-types";
import "../../Stylesheets/TransactionPage.css";
import jwt_decode from "jwt-decode";

class transactionPage extends Component {
    constructor() {
        super();

        this.state = {
            allTransactions: [],
            isUserAdmin: false,
            message: ""
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] == "ADMIN") {
                this.props.getAllTransactions();
                this.setState({isUserAdmin: true});
            } else {
                this.props.getTransactionsFor(decoded_token["username"]);
            }
        }
        fetch("http://localhost:8083/api/transactions/all").then((response) => response.json()).then(result => { this.setState({ allTransactions: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4 text-center">Transaction History</h1>
                                <br/>
                            </div>
                        </div>
                    
                    {/* Transaction history table */}
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th className="text-center" scope="col">Transaction Date</th>
                                <th className="text-center" scope="col">ISBN</th>
                                <th className="text-center" scope="col">Buyer Username</th>
                                <th className="text-center" scope="col">Seller Username</th>
                                <th className="text-center" scope="col">Price</th>
                                <th className="text-center" scope="col"># New Books</th>
                                <th className="text-center" scope="col"># Old Books</th>
                                <th className="text-center" scope="col">State</th>
                                <th className="text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allTransactions.map(transaction => (<tr key={transaction}>
                                
                                    <td className="text-center">{transaction.transactionDate.substring(0, 10)} ({transaction.transactionDate.substring(11,19)})</td>
                                    <td className="text-center">{transaction.isbn}</td>
                                    <td className="text-center">{transaction.buyerUsername}</td>
                                    <td className="text-center">{transaction.username}</td>
                                    <td className="text-center">{transaction.totalPrice}</td>
                                    <td className="text-center">{transaction.numOfNewBook > 0 ? transaction.numOfNewBook : "-"}</td>
                                    <td className="text-center">{transaction.numOfOldBook > 0 ? transaction.numOfOldBook : "-"}</td>
                                    <td className="text-center">{transaction.transactionState}</td>
                                    <td className="text-center">{this.state.isUserAdmin ?
                                        <div>
                                            {transaction.transactionState === "PENDING" &&
                                                <div>
                                                    <input className="btn btn-primary" type="submit" value="Accept"
                                                           onClick={() => this.props.approvePendingTransaction(transaction, this.props.history)} />
                                                    &nbsp;
                                                    <input className="btn btn-primary" type="submit" value="Reject"
                                                           onClick={() => this.props.rejectPendingTransaction(transaction, this.props.history)}/>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div>
                                            {transaction.transactionState === "APPROVED" &&
                                                <div>
                                                    <input className="btn btn-primary" type="submit" value="Refund"
                                                           onClick={() => this.props.requestRefundTransaction(transaction, this.props.history)} />
                                                </div>
                                            }
                                        </div>}
                                    </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
transactionPage.protoType = {
    getTransactions: PropTypes.func.isRequired,
    getTransactionsFor: PropTypes.func.isRequired,
    approvePendingTransaction: PropTypes.func.isRequired,
    rejectPendingTransaction: PropTypes.func.isRequired,
    requestRefundTransaction: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect (
    mapStateToProps,
    { requestRefundTransaction, rejectPendingTransaction, approvePendingTransaction, getAllTransactions, getTransactionsFor }
)(transactionPage);