import { checkPropTypes } from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    rejectPendingTransaction,
    approvePendingTransaction,
    requestRefundTransaction,
    getAllTransactions, 
    getTransactionsFor, 
    getOldestTransactionsFirst, 
    getLatestTransactionsFirst
} from '../../actions/transactionActions';
import PropTypes from "prop-types";
import "../../Stylesheets/TransactionPage.css";
import jwt_decode from "jwt-decode";

class transactionPage extends Component {
    constructor() {
        super();

        this.state = {
            allTransactions: [],
            sort: 0, 
            isUserAdmin: false,
            message: ""
        };

        this.handleSort.bind(this);
        this.changeLatestState.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] == "ADMIN") {
                fetch("http://localhost:8083/api/transactions/all").then((response) => response.json()).then(result => { this.setState({ allTransactions: result }) });
                this.setState({isUserAdmin: true});
            } else {
                fetch(`http://localhost:8083/api/transactions/allonlyuser/${decoded_token["username"]}`).then((response) => response.json()).then(result => { this.setState({ allTransactions: result }) });
                this.props.getTransactionsFor(decoded_token["username"]);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps ----->", nextProps)
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
        this.setState({allTransactions: nextProps.errors.bookErrors});
    }

    handleSort = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (e.target.value == "Latest") {
                // Latest transactions first
                this.setState({
                    sort: 1
                });
                this.props.getLatestTransactionsFirst(decoded_token["username"], this.state.isUserAdmin)
            } 
            else {
                // Oldest transactions first
                this.setState({
                    sort: 0
                });
                this.props.getOldestTransactionsFirst(decoded_token["username"], this.state.isUserAdmin)
            }
        }    
    }

    changeLatestState = (e) => {
        this.setState({
            isLatest: 1
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}

                    <div className="row mt-5 mb-2 h-100">
                        <div className="col">
                            <div className="row">
                                <h1 className="display-4">Transaction History</h1> 
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={this.state.sort == 1} value="Latest" onClick={this.handleSort}/>
                                <label class="form-check-label" for="flexRadioDefault1">Latest First</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.sort == 0} value="Oldest" onClick={this.handleSort}/>
                                <label class="form-check-label" for="flexRadioDefault2">Oldest First </label>
                            </div>
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
    getLatestTransactionsFirst: PropTypes.func.isRequired,
    getOldestTransactionsFirst: PropTypes.func.isRequired,
    approvePendingTransaction: PropTypes.func.isRequired,
    rejectPendingTransaction: PropTypes.func.isRequired,
    requestRefundTransaction: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect (
    mapStateToProps,
    { getAllTransactions, getTransactionsFor, getLatestTransactionsFirst,  getOldestTransactionsFirst, 
        requestRefundTransaction, rejectPendingTransaction, approvePendingTransaction }
)(transactionPage);