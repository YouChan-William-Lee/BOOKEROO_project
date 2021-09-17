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
                <div className="row">
                    {this.state.allBooks.map(book => (
                    <div className="column">
                        <Link to = {{
                            pathname: "/book",
                            state: {
                                isbn: `${book.isbn}`
                            }}}>
                        <img src={book.bookCoverURL} alt="Snow" />
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