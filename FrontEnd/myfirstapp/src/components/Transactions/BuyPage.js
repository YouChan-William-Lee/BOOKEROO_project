import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createTransaction } from "../../actions/transactionActions";
import jwt_decode from "jwt-decode";
import "../../Stylesheets/Book.css";

class BuyPage extends Component {

    constructor() {
        super();

        this.state = {
            book: "",
            buyerUsername: "",
            bookId: "",
            totalPrice: "",
            numOfOldBook: "",
            numOfNewBook: "",
            message: ""
        };

        this.handleNewTransaction = this.handleNewTransaction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            this.setState({ buyerUsername: decoded_token.username });
        }
        var isbn = this.props.history.location.pathname.substring(5);
        fetch(`http://localhost:8082/api/books/${isbn}`).then((response) => response.json()).then(result => { this.setState({ book: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    handleNewTransaction = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        this.state.totalPrice = (this.state.numOfNewBook) * (this.state.book.newBookPrice)
                                + (this.state.numOfOldBook) * (this.state.book.oldBookPrice);

        const newSell = {
            buyerUsername: this.state.buyerUsername,
            bookId: this.state.book.bookId,
            totalPrice: this.state.totalPrice,
            numOfOldBook: this.state.numOfOldBook,
            numOfNewBook: this.state.numOfNewBook
        }
        // Paypal API is working here
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Buy books</h1>
                            <br/>
                            <div className="center-image" >
                                <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                            </div>
                            <h2 className="display-6 text-center">{this.state.book.bookName}</h2>
                            <h2 className="display-6 text-center">{this.state.book.isbn}</h2>
                            <br/>
                            <h4 className="display-6 text-center">Available NEW book: {this.state.book.numOfNewBook}</h4>
                            <h4 className="display-6 text-center">Unit price for a NEW book: ${this.state.book.newBookPrice}</h4>
                            <br/>
                            <h4 className="display-6 text-center">Available OLD book: {this.state.book.numOfOldBook}</h4>
                            <h4 className="display-6 text-center">Unit price for a OLD book: ${this.state.book.oldBookPrice}</h4>
                            <br/>
                            <form onSubmit={this.handleSubmit}>
                                <div className="from-group">
                                    <label className="addSellText">The number of NEW book to buy</label>
                                    <br/>
                                    <span className="text-danger addBookErrorMessage"><small> Should be less than or equal to {this.state.book.numOfNewBook}</small></span>
                                    <input required className="form-control requiresBottomSpacing" type="text" name="numOfNewBook" value={this.state.numOfNewBook} onChange={this.handleNewTransaction} />
                                </div>

                                <div className="from-group">
                                    <label className="addSellText">The number of OLD book to buy</label>
                                    <br/>
                                    <span className="text-danger addBookErrorMessage"><small> Should be less than or equal to {this.state.book.numOfOldBook}</small></span>
                                    <input required className="form-control requiresBottomSpacing" type="text" name="numOfOldBook" value={this.state.numOfOldBook} onChange={this.handleNewTransaction} />
                                </div>

                                <div className="row addBookSubmitButton">
                                    <button type="submit" className="btn btn-primary">Paypal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
BuyPage.propTypes = {
    createTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        sellError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createTransaction }
)(BuyPage);