import React, {Component} from 'react';

class Search extends Component {
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
            </div>
        );
    }
}

export default Search;