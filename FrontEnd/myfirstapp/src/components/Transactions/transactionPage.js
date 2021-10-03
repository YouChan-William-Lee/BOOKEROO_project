import { checkPropTypes } from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllTransactions } from '../../actions/transactionActions';
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
        this.props.getAllTransactions();
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
                                <th className="text-center" scope="col">Transaction Date</th>
                                <th className="text-center" scope="col">ISBN</th>
                                <th className="text-center" scope="col">Buyer Username</th>
                                <th className="text-center" scope="col">Seller Username</th>
                                <th className="text-center" scope="col">Price</th>
                                <th className="text-center" scope="col"># New Books</th>
                                <th className="text-center" scope="col"># Old Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log("Transaction Content Here -------->", this.state.allTransactions)}
                            {this.state.allTransactions.map(transaction => (<tr key={transaction}>
                                
                                    <td className="text-center">{transaction.transactionDate}</td>
                                    <td className="text-center">{transaction.isbn}</td>
                                    <td className="text-center">{transaction.buyerUsername}</td>
                                    <td className="text-center">{transaction.username}</td>
                                    <td className="text-center">{transaction.totalPrice}</td>
                                    <td className="text-center">{transaction.numOfNewBook > 0 ? transaction.numOfNewBook : "-"}</td>
                                    <td className="text-center">{transaction.numOfoldBook > 0 ? transaction.numOfOldBook : "-"}</td>
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
    { getAllTransactions }
)(transactionPage);