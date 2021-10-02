import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBook } from "../../actions/bookActions";
import PropTypes from "prop-types";
import "../../Stylesheets/Book.css";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

class ShowOneBook extends Component {
    constructor() {
        super();

        this.state = {
            isUserAdmin: false,
            book: "",
            isbn: ""
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] == "ADMIN") {
                this.setState({ isUserAdmin: true });
            }
        }

        var isbn = this.props.history.location.pathname.substring(6);
        this.setState({ isbn: isbn });
        this.props.getBook(isbn, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ book: nextProps.errors.bookErrors });
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3 px-0">
                    <form>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="form-outline">
                                    <input className="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search"></input>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button id="search-button" type="submit" className="btn btn-primary w-100"> <i className="fas fa-search searchIcon"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
                <div>
                    <h1 className="display-4 text-center">{this.state.book.bookName}</h1>
                </div>
                {this.state.isUserAdmin && (
                    <input className="btn btn-primary" type="submit" value="Edit"
                        onClick={() => this.props.history.push(`/editbook/${this.state.book.isbn}`)} />)}
                <div className="center-image" >
                    <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                </div>
                <div>
                    <table className="col-md-5" align="center">
                        <tr>
                            <td></td>
                            <td><h3>retail price: ${this.state.book.price}</h3></td>
                            <td></td>
                        </tr>
                        <br />
                        <tr>
                            <td><input className="btn btn-primary" type="submit" value="Sell"
                                       onClick={() => this.props.history.push(`/sell/${this.state.book.isbn}`)} /></td>
                            <td><input className="btn btn-primary" type="submit" value="Paypal"
                                       onClick={() => this.props.history.push(`/buy/${this.state.book.isbn}`)} /></td>
                            <td><input className="btn btn-primary" type="submit" value="Share"
                                       onClick={() => this.props.history.push(`/share/${this.state.book.isbn}`)} /></td>
                        </tr>
                    </table>
                    <br />
                    <br />
                </div>
                <table className="col-md-5" align="center">
                    <thead>
                        <tr>
                            <th scope="col"><h3>Category</h3></th>
                            <th scope="col"><h3>Information</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Book name</td>
                            <td>{this.state.book.bookName}</td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>{this.state.book.author}</td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>{this.state.book.isbn}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{this.state.book.category}</td>
                        </tr>
                        <tr>
                            <td>Publication Date</td>
                            <td>{this.state.book.releaseDate}</td>
                        </tr>
                        <tr>
                            <td>Pages</td>
                            <td>{this.state.book.page}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
ShowOneBook.propTypes = {
    getBook: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { getBook }
)(ShowOneBook);