import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getBooks } from "../../actions/bookActions";
import PropTypes from "prop-types";
import "../../Stylesheets/BooksInHome.css";
import {Link} from "react-router-dom";


class ShowAllBooks extends Component {
    constructor() {
        super();

        this.state = {
            allBooks: []
        };
    }

    componentDidMount() {
        this.props.getBooks();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({allBooks: nextProps.errors.bookErrors});
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
                <div className="row">
                    {this.state.allBooks.map(book => (
                    <div className="col-md-2" align="center">
                        <Link to = {`/book/${book.isbn}`}>
                        <img src={book.bookCoverURL} alt={`${book.isbn}`} />
                        <h4>{book.bookName}</h4>
                        <h4>{book.author}</h4>
                        </Link>
                    </div>
                        ))}
                </div>
            </div>
        );
    }
}
ShowAllBooks.propTypes = {
    getBooks: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { getBooks }
)(ShowAllBooks);