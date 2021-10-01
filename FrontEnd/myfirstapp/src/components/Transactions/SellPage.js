import React, {Component} from 'react';
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createSell } from "../../actions/transactionActions";
import { getBook } from "../../actions/bookActions";
import jwt_decode from "jwt-decode";
import "../../Stylesheets/Book.css";

class SellPage extends Component {

    constructor() {
        super();

        this.state = {
            book: "",
            sellerUsername: "",
            bookISBN: "",
            bookState: "1",
            totalPrice: "",
            numOfBook: ""
        };

        this.handleNewSell = this.handleNewSell.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            this.setState({ sellerUsername: decoded_token.username });
        }
        var isbn = this.props.history.location.pathname.substring(6);
        this.props.getBook(isbn, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ book: nextProps.errors.bookErrors });
    }

    handleNewSell = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        this.state.totalPrice = (this.state.numOfBook) * (this.state.book.price);

        const newSell = {
            sellerUsername: this.state.sellerUsername,
            bookISBN: this.state.book.isbn,
            totalPrice: this.state.totalPrice,
            numOfBook: this.state.numOfBook
        }
        newSell['bookState'] = this.state.bookState === "1" ? "NEW" : "OLD";
        this.props.createSell(newSell, this.props.history);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sell books</h1>
                            <br/>
                            <div className="center-image" >
                                <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                            </div>
                            <h2 className="display-6 text-center">{this.state.book.bookName}</h2>
                            <h2 className="display-6 text-center">{this.state.book.isbn}</h2>
                            <br></br>

                            <form onSubmit={this.handleSubmit}>
                                <div className="d-flex justify-content-center my-3">
                                    <form action="create-profile.html">
                                        <select className="form-select bg-primary text-white p-2" name="bookState" onChange={this.handleNewSell}>
                                            <option value="1" selected>NEW</option>
                                            <option value="2" >OLD</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="from-group">
                                    <label className="addSellText">The number of books to sell</label>
                                    <input required className="form-control requiresBottomSpacing" type="text" name="numOfBook" value={this.state.numOfBook} onChange={this.handleNewSell} />
                                </div>

                                <div className="row addBookSubmitButton">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SellPage.propTypes = {
    createSell: PropTypes.func.isRequired,
    getBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        sellError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createSell, getBook }
)(SellPage);