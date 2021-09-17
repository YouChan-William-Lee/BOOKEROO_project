import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getBook } from "../../actions/bookActions";
import PropTypes from "prop-types";

class ShowOneBook extends Component {
    constructor() {
        super();

        this.state = {
            isbn: ""
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isbn: nextProps.errors.bookErrors});
        console.log(this.state.isbn)
    }

    render() {
        return (
            <div>
                <h2>Show One Book</h2>
                <h2>{this.state.isbn}</h2>
            </div>
        );
    }
}

export default ShowOneBook;