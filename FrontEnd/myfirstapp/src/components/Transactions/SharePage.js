import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createShare} from "../../actions/transactionActions";
import "../../Stylesheets/Book.css";

class SharePage extends Component {

    constructor() {
        super();

        this.state = {
            book: "",
            donatorUsername: "",
            bookISBN: "",
            bookState: "",
            numOfBook: "",
            message: ""
        };

        this.handleNewShare = this.handleNewShare.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            this.setState({ donatorUsername: decoded_token.username });
        }
        var isbn = this.props.history.location.pathname.substring(7);
        fetch(`http://localhost:8082/api/books/${isbn}`).then((response) => response.json()).then(result => { this.setState({ book: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    handleNewShare = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        const newShare = {
            donatorUsername: this.state.donatorUsername,
            bookISBN: this.state.book.isbn,
            bookState: "OLD",
            numOfBook: this.state.numOfBook
        }
        this.props.createShare(newShare, this.props.history);
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
                            <h1 className="display-4 text-center">Share books</h1>
                            <br/>
                            <div className="center-image" >
                                <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                            </div>
                            <h2 className="display-6 text-center">{this.state.book.bookName}</h2>
                            <h2 className="display-6 text-center">{this.state.book.isbn}</h2>
                            <br></br>

                            <form onSubmit={this.handleSubmit}>
                                <div className="from-group">
                                    <label className="addSellText">The number of books to share</label>
                                    <input required className="form-control requiresBottomSpacing" type="text" name="numOfBook" value={this.state.numOfBook} onChange={this.handleNewShare} />
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
SharePage.propTypes = {
    createShare: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        shareError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createShare }
)(SharePage);